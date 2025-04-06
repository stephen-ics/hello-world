import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import useShell from '../hooks/shell'
import { addHistory } from '../slices/terminalSlice'

export default function TerminalInput({ containerRef, inputRef }) {
    const [command, setCommand] = useState('');
    const history = useSelector(state => state.terminal.history)

    const dispatch = useDispatch();
    const shell = useShell();

    function handleChange(event) {
        setCommand(event.target.value);
    }

    function handleSubmit(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            dispatch(addHistory(`visitor@stephenni.com ~ % ${command}`));
        
            setCommand('');
            shell(command);

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
        <div className='m-2 text-[10px] font-mono whitespace-pre'>
            <div>
                {history && history.map((cmd, index) => (
                    <div key={index}>
                        <span>{cmd}</span>
                    </div>
                ))}
            </div>
            <div className=''>
                <span>visitor@stephenni.com ~ % </span>
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