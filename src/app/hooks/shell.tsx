import { useDispatch } from 'react-redux'
import { addHistory, clearHistory } from '../slices/terminalSlice'
import { closeTerminal } from '../slices/applicationSlice'

export default function useShell() {
    const dispatch = useDispatch();

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
            dispatch(addHistory('Professional Summary\nMe!'));
        } else if(args[0] === 'cd') {
            dispatch(addHistory(`cd: no such file or directory: ${command}`));
        }
        else if(args[0] === 'cat') {
            dispatch(addHistory(`cat: no such file or directory: ${command}`)); 
        }   else {
            dispatch(addHistory(`shell: command not found: ${command}`));
        }
    }
}