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
            dispatch(addHistory('Help command!'));
        } else if (args[0] === 'exit') {
            dispatch(addHistory('Closing terminal...'));
            setTimeout(() => {
                dispatch(closeTerminal())
            }, 1000);
        } else if (args[0] === 'ls') {
            if(directory === "") {
                dispatch(addHistory('professional-summary\nme!'));
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