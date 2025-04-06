import { useDispatch } from 'react-redux'
import { addHistory, clearHistory } from '../slices/terminalSlice'

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
        } else {
            dispatch(addHistory(`shell: command not found: ${command}`));
        }
    }
}