import { useSelector, useDispatch } from 'react-redux'
import { addHistory, clearHistory } from '../slices/terminalSlice'
import { addDirectory, removeDirectory } from '../slices/terminalSlice';
import { closeTerminal } from '../slices/applicationSlice'

export default function useShell() {
    const dispatch = useDispatch();
    const directory = useSelector(state => state.terminal.directory);

    return function handleCommand(command: string) {
        if(command == null) {
            return;
        }
    
        const args = command.split(' ');
    
        args[0] = args[0].toLowerCase();
    
        if(args[0].length == 0) {
            return;
        }
    
        if (args[0] === 'clear') {
            dispatch(clearHistory());
        } else if (args[0] === 'help') {
            dispatch(addHistory(`cat - view a file\ncd - navigate into a directory (cd .. to navigate backwards!)\nclear - clear the terminal\necho - print a message\nexit - exit the terminal\nhelp - display this message\nls - list contents of the current directory`));
        } else if(args[0] === 'echo') {
            if(args.length == 1) {
                dispatch(addHistory("\n"));
                return;
            }

            dispatch(addHistory(`${args[1]}`));
        }
        else if (args[0] === 'exit') {
            dispatch(addHistory('Closing terminal...'));
            setTimeout(() => {
                dispatch(closeTerminal())
            }, 1000);
        } else if (args[0] === 'ls') {
            if(directory === "") {
                dispatch(addHistory('professional-summary\nme!'));
            } else if(directory === " professional-summary") {
                dispatch(addHistory('education.md\nexperiences.md\nprojects.md\nskills.md'));
            } else if(directory === " me!") {
                dispatch(addHistory("about_me.md\nbooks.md\nthoughts.md"));
            }
        } else if(args[0] === 'cd') {
            if(args.length == 1 || args[1] == '') {
                return;
            }

            args[1] = args[1].toLowerCase();

            if(args[1] === "..") {
                dispatch(removeDirectory());
                return;
            }

            if(directory === "") {
                if(args[1] === "professional-summary") {
                    dispatch(addDirectory("professional-summary"));
                } else if(args[1] === "me!") {
                    dispatch(addDirectory("me!"));
                }
            } else {
                dispatch(addHistory(`cd: no such file or directory: ${args[1]}`));
            }
        }
        else if(args[0] === 'cat') {
            dispatch(addHistory(`cat: no such file or directory: ${args[1]}`)); 
        }   else {
            dispatch(addHistory(`shell: command not found: ${command}`));
        }
    }
}