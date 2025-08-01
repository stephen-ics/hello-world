'use client'

import { useState, useRef, useEffect } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import Draggable from 'react-draggable';
import HoverableImage from './hoverableImage';
import { motion } from 'framer-motion';

interface PDFViewerData {
    id: string;
    fileName: string;
    filePath: string;
    isHidden: boolean;
    isFullscreen: boolean;
    width: number;
    height: number;
    x: number;
    y: number;
    zIndex: number;
}

export default function PDFViewer({ fileData, onClose, onHide, onMaximize, onMinimize, onSelect, onUpdatePosition, onUpdateSize }: { 
    fileData: PDFViewerData;
    onClose: () => void;
    onHide: (params: any) => void;
    onMaximize: (params: any) => void;
    onMinimize: () => void;
    onSelect: () => void;
    onUpdatePosition: (params: any) => void;
    onUpdateSize: (params: any) => void;
}) {  
    const [size, setSize] = useState({ width: fileData.width, height: fileData.height });
    const [position, setPosition] = useState({ x: fileData.x, y: fileData.y });
    const [mounted, setMounted] = useState(false);
    const [animateTransition, setAnimateTransition] = useState(false);

    const dragRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSize({ width: fileData.width, height: fileData.height });
        setPosition({ x: fileData.x, y: fileData.y });
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            setSize({ width: fileData.width, height: fileData.height });
            if (fileData.isFullscreen) {
                setPosition({ x: 0, y: 0 });
                setSize({ width: window.innerWidth, height: window.innerHeight });
            } else {
                setPosition({ x: fileData.x, y: fileData.y });
            }
        }
    }, [fileData.width, fileData.height, fileData.x, fileData.y, fileData.isFullscreen, mounted]);

    if (!mounted) return null;

    function handleClickRed() {
        onClose();
    }

    function handleClickYellow() {
        onHide({ 
            width: size.width, 
            height: size.height, 
            x: position.x, 
            y: position.y 
        });
    }

    function handleClickGreen() {
        setAnimateTransition(true);

        if (fileData.isFullscreen) {
            onMinimize();
        } else {
            onMaximize({ 
                width: size.width, 
                height: size.height, 
                x: position.x, 
                y: position.y 
            });
        }

        setTimeout(() => setAnimateTransition(false), 350);
    }

    const onResize = (event: any, { size: newSize }: { size: { width: number; height: number } }) => {
        setSize(newSize);
        onUpdateSize({
            width: newSize.width,
            height: newSize.height
        });
    };

    const handleDrag = (e: any, data: any) => {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const maxX = screenW - size.width;
        const maxY = screenH - size.height;

        const newX = Math.max(0, Math.min(data.x, maxX));
        const newY = Math.max(0, Math.min(data.y, maxY));
        setPosition({ x: newX, y: newY });
        
        onUpdatePosition({
            x: newX,
            y: newY
        });
    };

    function handleDivClick() {
        onSelect();
    }

    return (
        <Draggable 
            position={position} 
            onDrag={handleDrag} 
            nodeRef={dragRef as any} 
            handle=".handle"
            disabled={fileData.isFullscreen}
        >
            <motion.div 
                ref={dragRef} 
                className='absolute'
                style={{ zIndex: fileData.zIndex }}
                animate={{
                    width: fileData.isFullscreen ? '100vw' : `${size.width}px`,
                    height: fileData.isFullscreen ? '100vh' : `${size.height}px`,
                    x: fileData.isFullscreen ? 0 : position.x,
                    y: fileData.isFullscreen ? 0 : position.y,
                }}
                transition={animateTransition ? { duration: 0.3, ease: 'easeOut' } : { duration: 0 }}
                onClick={handleDivClick}
            >
                <Resizable 
                    width={size.width} 
                    height={size.height} 
                    onResize={onResize}
                >
                    <div
                        style={{ width: '100%', height: '100%' }}
                        className={"outline-solid outline-gray-300/50 duration-300 bg-white w-full lg:min-w-[600px] min-w-[400px] lg:min-h-[500px] min-h-[400px] border-2 border-solid border-gray-300 flex flex-col overflow-hidden" + (fileData.isFullscreen ? " rounded-none" : " rounded-lg")}
                    >
                        <div className="bg-gray-200 hover:bg-gray-300/80 handle transition">
                            <div className='flex m-3 justify-between items-center'>
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
                                <div className="flex-1 text-center">
                                    <p className="font-bold text-black/75 text-base">{fileData.fileName || 'Untitled'}</p>
                                </div>
                                <div className="w-5/9 max-w-[4vw]"></div>
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden bg-gray-100">
                            <iframe
                                src={fileData.filePath}
                                className="w-full h-full"
                                title={fileData.fileName}
                            />
                        </div>
                    </div>
                </Resizable>
            </motion.div>
        </Draggable>
    );
} 