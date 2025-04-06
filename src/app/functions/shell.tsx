export function shell(
    command: string,
    setHistory: (val: string) => void
) {
    const args = command.split(' ');

    args[0] = args[0].toLowerCase();

    if(args[0].length == 0) {
        return;
    }

    if (args[0] === 'clear') {
        setHistory([]);
    } else {
        setHistory((prevHistory) => [...prevHistory, `shell: command not found: ${command}`]);
    }
}