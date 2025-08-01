import { useSelector, useDispatch } from 'react-redux'
import { addHistory, clearHistory } from '../slices/terminalSlice'
import { addDirectory, removeDirectory } from '../slices/terminalSlice';
import { openMarkdownFile, closeTerminal } from '../slices/applicationSlice';
import { useFileSystem } from './useFileSystem';


export default function useShell() {
    const dispatch = useDispatch();
    const directory = useSelector(state => state.terminal.directory);
    const { getItemsAtPath, getItemByPath } = useFileSystem();

    // Convert terminal directory format to file system path
    const getCurrentPath = () => {
        if (!directory || directory === "") {
            return "/";
        }
        // Remove leading space if present
        const cleanDir = directory.trim();
        return "/" + cleanDir;
    };

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
            dispatch(addHistory('Available commands:\n  ls - list directory contents\n  cd <dir> - change directory\n  cat <file> - display file contents\n  clear - clear terminal\n  echo <text> - display text\n  exit - close terminal'));
        } else if(args[0] === 'echo') {
            if(args.length == 1) {
                dispatch(addHistory("\n"));
                return;
            }

            // Join all arguments after echo
            const text = args.slice(1).join(' ');
            dispatch(addHistory(text));
        }
        else if (args[0] === 'exit') {
            dispatch(addHistory('Closing terminal...'));
            setTimeout(() => {
                dispatch(closeTerminal())
            }, 1000);
        } else if (args[0] === 'ls') {
            const currentPath = getCurrentPath();
            const items = getItemsAtPath(currentPath);
            
            if (items.length === 0) {
                dispatch(addHistory(''));
            } else {
                const itemNames = items.map(item => item.name).join('\n');
                dispatch(addHistory(itemNames));
            }
        } else if(args[0] === 'cd') {
            if(args.length == 1 || args[1] == '') {
                // Go to root
                dispatch(removeDirectory());
                dispatch(removeDirectory()); // Call twice to ensure we're at root
                return;
            }

            const target = args[1].toLowerCase();

            if(target === "..") {
                dispatch(removeDirectory());
                return;
            }

            if(target === "/") {
                // Go to root
                dispatch(removeDirectory());
                dispatch(removeDirectory()); // Call twice to ensure we're at root
                return;
            }

            // Check if it's an absolute path
            if(target.startsWith("/")) {
                const path = target;
                const item = getItemByPath(path);
                
                if(item && item.type === 'folder') {
                    // Clear current directory and set new one
                    dispatch(removeDirectory());
                    dispatch(removeDirectory()); // Go to root first
                    
                    const pathParts = path.split('/').filter(part => part !== '');
                    pathParts.forEach(part => {
                        dispatch(addDirectory(part));
                    });
                } else {
                    dispatch(addHistory(`cd: no such file or directory: ${target}`));
                }
            } else {
                // Relative path
                const currentPath = getCurrentPath();
                const newPath = currentPath === "/" ? "/" + target : currentPath + "/" + target;
                const item = getItemByPath(newPath);
                
                if(item && item.type === 'folder') {
                    dispatch(addDirectory(target));
                } else {
                    dispatch(addHistory(`cd: no such file or directory: ${target}`));
                }
            }
        }
        else if(args[0] === 'cat') {
            if(args.length == 1) {
                dispatch(addHistory('cat: missing file operand'));
                return;
            }

            const fileName = args[1];
            const currentPath = getCurrentPath();
            const filePath = currentPath === "/" ? "/" + fileName : currentPath + "/" + fileName;
            const item = getItemByPath(filePath);
            
            if(item && item.type === 'file') {
                // Open the markdown file in the viewer
                dispatch(openMarkdownFile({
                    fileName: item.name,
                    filePath: item.content || item.path
                }));
                dispatch(addHistory(`Opening ${fileName} in viewer...`));
            } else {
                dispatch(addHistory(`cat: ${fileName}: No such file or directory`));
            }
        } else {
            dispatch(addHistory(`shell: command not found: ${command}`));
        }
    }
}