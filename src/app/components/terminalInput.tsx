import { useState, useEffect } from 'react';
import { shell } from '../functions/shell'

export default function TerminalInput({ containerRef, inputRef }) {
    const [command, setCommand] = useState('');
    const [history, setHistory] = useState([]);

    function handleChange(event) {
        setCommand(event.target.value);
    }

    function handleSubmit(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            setHistory(prevHistory => [...prevHistory, `$ ${command}`]);
        
            setCommand('');
            shell(command, setHistory);

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
        <div className='m-2 text-xs'>
            <div>Command: {command}</div>
            <div>
                {history.map((cmd, index) => (
                    <div key={index}>
                        <span>{cmd}</span>
                    </div>
                ))}
            </div>
            <div className=''>
                <span>$ </span>
                <input
                    ref={inputRef}
                    name="command"
                    type="text"
                    value={command}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                    autoFocus
                    className='border-none outline-none'
                />
            </div>
        </div>
    );
}