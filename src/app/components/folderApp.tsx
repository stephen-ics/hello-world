import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openFolder, showFolder } from '../slices/applicationSlice'
import { addHistory } from '../slices/terminalSlice'
import Image from 'next/image'
import { animateAppOpen, animateAppClose } from '../animations/appAnimations'
import { motion, useAnimation } from 'framer-motion'

export default function FolderApp({ isDock = false }) {
    const folderOpen = useSelector(state => state.application.folderOpen)
    const controls = useAnimation();

    const dispatch = useDispatch();

    const handleClick = async () => {
        if(folderOpen === false) {
            await animateAppClose(controls);
    
            await new Promise(resolve => setTimeout(resolve, 500));

            dispatch(openFolder());
        } else {
            await animateAppOpen(controls);
        }

        dispatch(showFolder());
    }

    return (
        <motion.div animate={controls} onClick={handleClick}>
            <div className='relative flex flex-col items-center'>
                <Image
                    src='/terminal_icons/terminal_folder.png'
                    width={50}
                    height={50}
                    alt='terminal icon'
                />
                {(folderOpen && isDock) &&
                    <div className='absolute bottom-[-1px] rounded-full opacity-75'>
                        <Image 
                            src='/app_icons/app_active.png'
                            width={4}
                            height={4}
                            alt='app active'
                        />
                    </div>
                }
            </div>
        </motion.div>
    );
}