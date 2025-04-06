import { useState, useEffect } from 'react';

export default function TerminalInput({ containerRef, inputRef }) {
    const [command, setCommand] = useState('');
    const [history, setHistory] = useState([]);

    function handleChange(event) {
        setCommand(event.target.value);
    }

    function handleSubmit(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            setHistory(prevHistory => [...prevHistory, command]);
            setCommand('');


            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
            });
        }
    }

    useEffect(() => {
        if (inputRef.current) {
          inputRef.current.scrollIntoView();
          inputRef.current.focus({ preventScroll: true });
        }
      }, [history]);
    

    return (
        <div className=''>
            <div>Command: {command}</div>
            <div>
                {history.map((cmd, index) => (
                    <div key={index}>{cmd}</div>
                ))}
            </div>
            <input
                ref={inputRef}
                name="command"
                type="text"
                value={command}
                onChange={handleChange}
                onKeyDown={handleSubmit}
                autoFocus
            />
        </div>
    );
}