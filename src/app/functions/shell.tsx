export function shell(
    command: string,
    setHistory: (val: string) => void
) {
    const args = command.split(' ');
    args.shift();
    args[0] = args[0].toLowerCase();

    console.log(args[0]);

    if (args[0] === 'clear') {
        setHistory([]);
    } else {
        setHistory((prevHistory) => [...prevHistory, `shell: command not found: ${command}`]);
    }
}