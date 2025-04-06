'use client'

import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { closeTerminal, hideTerminal, maximizeTerminal, minimizeTerminal, openDesktopTab, openDownloadsTab } from '../slices/applicationSlice'
import { clearHistory } from '../slices/terminalSlice'
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import Draggable from 'react-draggable';
import HoverableImage from './hoverableImage';
import Image from 'next/image'
import { motion } from 'framer-motion';

export default function Finder({ inputRef }) {
    const [size, setSize] = useState({ width: 500, height: 300 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);
    const [animateTransition, setAnimateTransition] = useState(false);
    const dispatch = useDispatch();

    const terminalFullscreen = useSelector(state => state.application.terminalFullscreen)
    const originalWidth = useSelector(state => state.application.terminalOriginalWidth)
    const originalHeight = useSelector(state => state.application.terminalOriginalHeight)
    const originalX = useSelector(state => state.application.terminalOriginalX)
    const originalY = useSelector(state => state.application.terminalOriginalY)

    const finderDesktopOpen = useSelector(state => state.application.finderTabDesktop)
    const finderDownloadsOpen = useSelector(state => state.application.finderTabDownloads)

    const dragRef = useRef(null);

    useEffect(() => {
        const x = window.innerWidth / 2 - size.width / 2;
        const y = window.innerHeight / 2 - size.height;
        setPosition({ x, y });
        setMounted(true);
    }, []);

    if (!mounted) return null;

    function handleClickRed() {
        dispatch(closeTerminal());
        dispatch(clearHistory());
    }

    function handleClickYellow() {
        dispatch(hideTerminal());
    }

    function handleClickGreen() {
        setAnimateTransition(true);

        if (terminalFullscreen) {
            dispatch(minimizeTerminal());
            setSize({ width: originalWidth, height: originalHeight });
            setPosition({ x: originalX, y: originalY });
        } else {
            dispatch(maximizeTerminal({ width: size.width, height: size.height, x: position.x, y: position.y }));
            setSize({ width: window.innerWidth, height: window.innerHeight });
            setPosition({ x: 0, y: 0 });
        }

        setTimeout(() => setAnimateTransition(false), 350);
    }

    function handleDesktopClick() {
        dispatch(openDesktopTab());
    }

    function handleDownloadsClick() {
        dispatch(openDownloadsTab());
    }

    const onResize = (event, { size: newSize }) => {
        setSize(newSize);
    };

    const handleDrag = (e, data) => {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const maxX = screenW - size.width;
        const maxY = screenH - size.height;

        const newX = Math.max(0, Math.min(data.x, maxX));
        const newY = Math.max(0, Math.min(data.y, maxY));
        setPosition({ x: newX, y: newY });
    };

    return (
        <Draggable nodeRef={dragRef} handle=".handle" position={position} onDrag={handleDrag}>
            <motion.div
                ref={dragRef}
                animate={{
                    width: size.width,
                    height: size.height,
                    x: position.x,
                    y: position.y
                }}
                transition={animateTransition ? { duration: 0.3, ease: 'easeOut' } : { duration: 0 }}
            >
                <Resizable width={size.width} height={size.height} onResize={onResize}>
                    <div
                        style={{ width: '100%', height: '100%' }}
                        className={"bg-gray-50 w-full lg:min-w-[500px] min-w-[300px] lg:min-h-[30vh] min-h-[300px] border-2 border-solid border-gray-300 flex overflow-hidden text-sm" + (terminalFullscreen ? " rounded-none" : " rounded-lg")}
                    >
                        <div className="bg-gray-300 hover:bg-gray-300/80 handle transition duration-300 w-1/4">
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
                                    <div className='text-sm font-semibold text-gray-700 opacity-50'>
                                        Favourite
                                    </div>
                                    <div className='flex p-1 px-2 rounded-md cursor-default duration-300' style={finderDesktopOpen ? { backgroundColor: 'rgba(185, 187, 187, 0.7)' } : {}} onClick={handleDesktopClick}>
                                        <Image 
                                            src='/app_icons/app_desktop.png'
                                            width={15}
                                            height={15}
                                            alt='app active'
                                            className='object-contain'
                                        />
                                        <div className='mx-2'>Desktop</div>
                                    </div>
                                    <div className='flex p-1 px-2 rounded-md cursor-default duration-300' style={finderDownloadsOpen ? { backgroundColor: 'rgba(185, 187, 187, 0.7)' } : {}} onClick={handleDownloadsClick}>
                                        <Image 
                                            src='/app_icons/app_downloads.png'
                                            width={15}
                                            height={15}
                                            alt='app active'
                                            className='object-contain'
                                        />
                                        <div className='mx-2'>
                                            Downloads
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-full'>
                            <div className='w-full h-1/8 bg-gray-200 handle hover:bg-gray-200/80 transition duration-300 flex items-center'>
                                <div className='flex items-center ml-4'>
                                    <div className='hover:bg-gray-300/80 duration-300 rounded-md p-2'>
                                        <Image 
                                            src='/app_icons/app_downloads.png'
                                            width={15}
                                            height={15}
                                            alt='app active'
                                            className='object-contain'
                                        />
                                    </div>
                                    <div className='hover:bg-gray-300/80 duration-300 rounded-md p-2'>
                                        <Image 
                                            src='/app_icons/app_downloads.png'
                                            width={15}
                                            height={15}
                                            alt='app active'
                                            className='object-contain'
                                        />
                                    </div>
                                    <div className='p-2'>
                                        HSALDKAS:DL
                                    </div>
                                </div>
                            </div>
                            <div>
                                
                            </div>
                        </div>
                    </div>
                </Resizable>
            </motion.div>
        </Draggable>
    );
}