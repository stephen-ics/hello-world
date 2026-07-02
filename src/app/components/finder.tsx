'use client'

import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { changeDirectory, closeFinder, hideFinder, maximizeFinder, minimizeFinder, selectFinder, openDesktopTab, openDownloadsTab, openMarkdownFile, openPdfFile } from '../slices/applicationSlice'
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import Draggable from 'react-draggable';
import HoverableImage from './hoverableImage';
import Image from 'next/image'
import Folder from './folder'
import MarkdownFileIcon from './markdownFileIcon'
import PDFFileIcon from './pdfFileIcon'
import { motion } from 'framer-motion';
import { useFileSystem } from '../hooks/useFileSystem';
import { getParentPath } from '../config/fileSystem';
import type { FileSystemItem } from '../hooks/useFileSystem';

export default function Finder() {
    const [size, setSize] = useState({ width: 800, height: 600 });
    // Initialize position to center of screen
    const [position, setPosition] = useState({ 
        x: typeof window !== 'undefined' ? window.innerWidth / 2 - 400 : 0, 
        y: typeof window !== 'undefined' ? window.innerHeight / 2 - 300 : 0 
    });
    const [mounted, setMounted] = useState(false);
    const [animateTransition, setAnimateTransition] = useState(false);
    const dispatch = useDispatch();

    // State for selected items
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const finderFullscreen = useSelector((state: any) => state.application.finderFullscreen)
    const finderWidth = useSelector((state: any) => state.application.finderWidth)
    const finderHeight = useSelector((state: any) => state.application.finderHeight)
    const finderX = useSelector((state: any) => state.application.finderX)
    const finderY = useSelector((state: any) => state.application.finderY)

    const finderDesktopOpen = useSelector((state: any) => state.application.finderTabDesktop)
    const finderDownloadsOpen = useSelector((state: any) => state.application.finderTabDownloads)
    const finderDirectory = useSelector((state: any) => state.application.finderDirectory)

    const [defaultX, setDefaultX] = useState(0);
    const [defaultY, setDefaultY] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<HTMLDivElement>(null);

    // Use dynamic file system
    const { getItemsAtPath, loading: fileSystemLoading, refetch } = useFileSystem();

    // Get current path based on finderDirectory
    const getCurrentPath = () => {
        if (finderDirectory === "Desktop" || finderDirectory === "Downloads") {
            return "/";
        }
        // finderDirectory stores a relative path like "me/thoughts"
        return "/" + finderDirectory;
    };

    const getDirectoryLabel = () => {
        if (finderDirectory === "Desktop" || finderDirectory === "Downloads") {
            return finderDirectory;
        }

        const parts = finderDirectory.split('/').filter((part: string) => part !== '');
        return parts[parts.length - 1] || "Desktop";
    };

    // Get items for current directory
    const currentItems = getItemsAtPath(getCurrentPath());

    useEffect(() => {
        // Set size from Redux or use default
        const initialWidth = finderWidth || 800;
        const initialHeight = finderHeight || 600;
        setSize({ width: initialWidth, height: initialHeight });
        
        // Calculate center position based on actual size
        const centerX = window.innerWidth / 2 - initialWidth / 2;
        const centerY = window.innerHeight / 2 - initialHeight / 2;
        setDefaultX(centerX);
        setDefaultY(centerY);
        
        // Check if we have saved position from Redux state
        if (finderX !== -1 && finderY !== -1) {
            setPosition({ x: finderX, y: finderY });
        } else {
            // Use calculated center position
            setPosition({ x: centerX, y: centerY });
        }
        
        setMounted(true);
    }, []);

    // Handle fullscreen changes
    useEffect(() => {
        if (mounted) {
            if (finderFullscreen) {
                setSize({ width: window.innerWidth, height: window.innerHeight });
                setPosition({ x: 0, y: 0 });
            } else {
                // Only use saved position if it's not the default -1
                if (finderX !== -1 && finderY !== -1) {
                    setSize({ width: finderWidth, height: finderHeight });
                    setPosition({ x: finderX, y: finderY });
                }
                // Otherwise keep the current position (which should be centered)
            }
        }
    }, [finderFullscreen, mounted]);

    if (!mounted) return null;
    
    // Ensure we have window dimensions
    if (typeof window === 'undefined') return null;

    const onResize = (event: any, { size }: { size: { width: number; height: number } }) => {
        setSize({width: size.width, height: size.height});
    };

    const handleDrag = (e: any, data: any) => {
        setPosition({ x: data.x, y: data.y });
    };

    const handleClickRed = () => {
        dispatch(closeFinder());
    }

    const handleClickYellow = () => {
        dispatch(hideFinder({
            width: size.width,
            height: size.height,
            x: position.x,
            y: position.y
        }));
    }

    const handleClickGreen = () => {
        if (finderFullscreen) {
            dispatch(minimizeFinder({
                width: finderWidth,
                height: finderHeight,
                x: finderX,
                y: finderY
            }));
        } else {
            dispatch(maximizeFinder({
                width: size.width,
                height: size.height,
                x: position.x,
                y: position.y
            }));
        }
        setAnimateTransition(true);
        setTimeout(() => setAnimateTransition(false), 350);
    }

    const handleSelectFinder = () => {
        dispatch(selectFinder());
    }

    const handleDesktopClick = () => {
        dispatch(openDesktopTab());
        dispatch(changeDirectory("Desktop"));
        setSelectedItems([]);
    }

    const handleDownloadsClick = () => {
        dispatch(openDownloadsTab());
        dispatch(changeDirectory("Downloads"));
        setSelectedItems([]);
    }

    const handleLeftArrowClick = () => {
        const currentPath = getCurrentPath();
        if (currentPath !== "/") {
            const parentPath = getParentPath(currentPath);
            if (parentPath === "/") {
                dispatch(changeDirectory("Desktop"));
            } else {
                dispatch(changeDirectory(parentPath.substring(1)));
            }
            setSelectedItems([]);
        }
    }

    const handleRightArrowClick = () => {
        // Navigate to first selected folder if any
        const selectedFolders = selectedItems
            .map(name => currentItems.find(item => item.name === name))
            .filter(item => item && item.type === 'folder');
        
        if (selectedFolders.length > 0 && selectedFolders[0]) {
            dispatch(changeDirectory(selectedFolders[0].path.substring(1)));
            setSelectedItems([]);
        }
    }

    const handleItemClick = (item: FileSystemItem, event: React.MouseEvent) => {
        event.stopPropagation();
        
        // Single click just selects the item
        setSelectedItems([item.name]);
    }

    const handleItemDoubleClick = (item: FileSystemItem) => {
        if (item.type === 'folder') {
            dispatch(changeDirectory(item.path.substring(1)));
            setSelectedItems([]);
        } else if (item.type === 'file' && item.name.endsWith('.md')) {
            // Open markdown file on double click
            dispatch(openMarkdownFile({
                fileName: item.name,
                filePath: item.content || item.path
            }));
        } else if (item.type === 'file' && item.name.endsWith('.pdf')) {
            // Open PDF file on double click
            dispatch(openPdfFile({
                fileName: item.name,
                filePath: item.content || item.path
            }));
        }
    }

    const unselectAll = (event: React.MouseEvent) => {
        event.stopPropagation();
        setSelectedItems([]);
    }

    const isLeftArrowDisabled = () => {
        return finderDirectory === "Desktop" || finderDirectory === "Downloads";
    }

    const isRightArrowDisabled = () => {
        const selectedFolders = selectedItems
            .map(name => currentItems.find(item => item.name === name))
            .filter(item => item && item.type === 'folder');
        return selectedFolders.length === 0;
    }

    return (
        <Draggable 
            nodeRef={dragRef as any} 
            handle=".handle" 
            position={position} 
            onDrag={handleDrag}
            disabled={finderFullscreen}
            defaultPosition={{ x: window.innerWidth / 2 - 400, y: window.innerHeight / 2 - 300 }}
        >
            <motion.div
                ref={dragRef}
                className='absolute'
                animate={{
                    width: finderFullscreen ? '100vw' : `${size.width}px`,
                    height: finderFullscreen ? '100vh' : `${size.height}px`,
                    x: finderFullscreen ? 0 : position.x,
                    y: finderFullscreen ? 0 : position.y
                }}
                transition={animateTransition ? { duration: 0.3, ease: 'easeOut' } : { duration: 0 }}
                onClick={handleSelectFinder}
            >
                <Resizable width={size.width} height={size.height} onResize={onResize}>
                    <div
                        style={{ width: '100%', height: '100%' }}
                        className={"outline-solid outline-gray-300/50 duration-300 bg-gray-50 w-full lg:text-xs text-[9px] lg:min-w-[500px] min-w-[300px] lg:min-h-[30vh] min-h-[300px] border-2 border-solid border-gray-300 flex overflow-hidden" + (finderFullscreen ? " rounded-none" : " rounded-lg")}
                    >
                        <div className="bg-gray-200 hover:bg-gray-300/80 handle transition w-1/5 max-w-[130px] lg:min-w-[120px] min-w-[100px] lg:block">
                            <div className='flex flex-col m-3'>
                                <div className="flex w-full">
                                    <div className="flex w-5/9 max-w-[4vw] items-center">
                                        <HoverableImage 
                                            srcDefault="/terminal_icons/terminal_red.png"
                                            srcHover="/terminal_icons/terminal_red_hover.png"
                                            width={500}
                                            height={500}
                                            alt="red terminal icon"
                                            handleClick={handleClickRed}
                                        />
                                        <HoverableImage 
                                            srcDefault="/terminal_icons/terminal_yellow.png"
                                            srcHover="/terminal_icons/terminal_yellow_hover.png"
                                            width={500}
                                            height={500}
                                            alt="yellow terminal icon"
                                            handleClick={handleClickYellow}
                                        />
                                        <HoverableImage 
                                            srcDefault="/terminal_icons/terminal_green.png"
                                            srcHover="/terminal_icons/terminal_green_hover.png"
                                            width={500}
                                            height={500}
                                            alt="green terminal icon"
                                            handleClick={handleClickGreen}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col my-3'>
                                    <div className='font-semibold text-gray-700 opacity-50'>
                                        Favourite
                                    </div>
                                    <div className='flex p-1 px-2 rounded-md cursor-default justify-start items-center duration-300' style={finderDesktopOpen ? { backgroundColor: 'rgba(185, 187, 187, 0.7)' } : {}} onClick={handleDesktopClick}>
                                        <Image 
                                            src='/app_icons/app_desktop.png'
                                            width={15}
                                            height={15}
                                            alt='app active'
                                            className='object-contain'
                                        />
                                        <div className='mx-1'>Desktop</div>
                                    </div>
                                    <div className='flex p-1 px-2 rounded-md cursor-default justify-start items-center duration-300' style={finderDownloadsOpen ? { backgroundColor: 'rgba(185, 187, 187, 0.7)' } : {}} onClick={handleDownloadsClick}>
                                        <Image 
                                            src='/app_icons/app_downloads.png'
                                            width={15}
                                            height={15}
                                            alt='app active'
                                            className='object-contain'
                                        />
                                        <div className='mx-1'>
                                            Downloads
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-full outline-solid outline-gray-400/40  shadow-sm outline-1'>
                            <div 
                                className='w-full outline-solid outline-gray-300/60 outline-1 shadow-sm h-1/10 max-h-[50px] min-h-[42px] bg-gray-200 handle hover:bg-gray-200/80 transition flex items-center'
                            >
                                <div className='flex items-center ml-4'>
                                    <div className='hover:bg-gray-300/80 duration-300 rounded-md p-2' onClick={handleLeftArrowClick}>
                                        {isLeftArrowDisabled() ?
                                            <Image 
                                                src='/app_icons/app_finder_left_light.png'
                                                width={9}
                                                height={9}
                                                alt='app active'
                                                className='object-contain'
                                            /> : <Image 
                                                src='/app_icons/app_finder_left_dark.png'
                                                width={9}
                                                height={9}
                                                alt='app active'
                                                className='object-contain'
                                            />
                                        }
                                    </div>
                                    <div className='hover:bg-gray-300/80 duration-300 rounded-md p-2' onClick={handleRightArrowClick}>
                                        {isRightArrowDisabled() ?
                                            <Image 
                                                src='/app_icons/app_finder_right_light.png'
                                                width={9}
                                                height={9}
                                                alt='app active'
                                                className='object-contain'
                                            /> : <Image 
                                                src='/app_icons/app_finder_right_dark.png'
                                                width={9}
                                                height={9}
                                                alt='app active'
                                                className='object-contain'
                                            />
                                        }
                                    </div>
                                    <div className='p-2 text-sm text-black/70 font-bold flex-1'>
                                        {getDirectoryLabel()}
                                    </div>
                                    <div 
                                        className='hover:bg-gray-300/80 duration-300 rounded-md p-2 mr-2 cursor-pointer' 
                                        onClick={refetch}
                                        title="Refresh file system"
                                    >
                                        <svg 
                                            className="w-4 h-4 text-gray-600" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full h-full' onClick={unselectAll}>
                                <div className='p-4 gap-10 flex flex-wrap'>
                                    {currentItems.map((item) => (
                                        <div 
                                            key={item.name}
                                            onClick={(e) => handleItemClick(item, e)}
                                            onDoubleClick={() => handleItemDoubleClick(item)}
                                        >
                                            {item.type === 'folder' ? (
                                                <Folder 
                                                    name={item.name} 
                                                    selected={selectedItems.includes(item.name)} 
                                                />
                                            ) : item.name.endsWith('.pdf') ? (
                                                <PDFFileIcon 
                                                    name={item.name} 
                                                    selected={selectedItems.includes(item.name)} 
                                                />
                                            ) : (
                                                <MarkdownFileIcon 
                                                    name={item.name} 
                                                    selected={selectedItems.includes(item.name)} 
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Resizable>
            </motion.div>
        </Draggable>
    );
}
