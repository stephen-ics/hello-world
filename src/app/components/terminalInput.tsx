import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import useShell from '../hooks/shell'
import { addHistory } from '../slices/terminalSlice'

export default function TerminalInput({ containerRef, inputRef }: { containerRef: any; inputRef: any }) {
    const [command, setCommand] = useState('');
    const history = useSelector((state: any) => state.terminal.history);
    const directory = useSelector((state: any) => state.terminal.directory);

    const dispatch = useDispatch();
    const shell = useShell();

    function handleChange(event: any) {
        setCommand(event.target.value);
    }

    function handleSubmit(event: any) {
        if (event.key === 'Enter') {
            event.preventDefault();
            dispatch(addHistory(`visitor@stephenni.com${directory} % ${command}`));
        
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
      }, [history, inputRef]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [command, inputRef]);
    

    return (
        <div className='m-2 text-[10px] font-mono whitespace-pre-wrap break-words'>
            <div>
                {history && history.map((cmd: any, index: any) => (
                    <div key={index}>
                        <span>{cmd}</span>
                    </div>
                ))}
            </div>
            <div className='w-full flex'>
                <div className='whitespace-nowrap'>visitor@stephenni.com{directory} %&nbsp;</div>
                <textarea
                    ref={inputRef}
                    name="command"
                    value={command}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                    autoFocus
                    rows={1}
                    className='flex-1 border-none outline-none bg-transparent text-black caret-black resize-none overflow-hidden whitespace-pre-wrap break-words'
                />
            </div>
        </div>
    );
}
