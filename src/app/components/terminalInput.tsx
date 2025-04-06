import { useState } from 'react'

export default function TerminalInput({ containerRef }) {
    const [command, setCommand] = useState('');

    function handleChange(event) {
        setCommand(event.target.value);
    }

    function handleSubmit(event) {
        if(event.key === 'Enter') {
            console.log("WHOOSH");
        }
    }

    return (
        <div>
            <div>Command: {command}</div>
            <input 
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