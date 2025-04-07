import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openTerminal, showTerminal } from '../slices/applicationSlice'
import { addHistory } from '../slices/terminalSlice'
import Image from 'next/image'
import { animateAppOpen, animateAppClose } from '../animations/appAnimations'
import { motion, useAnimation } from 'framer-motion'

export default function TerminalApp({ isDock = false }) {
    const terminalOpen = useSelector(state => state.application.terminalOpen)

    const controls = useAnimation();

    const dispatch = useDispatch();

    const handleClick = async () => {
        if(terminalOpen === false) {
            await animateAppClose(controls);
    
            await new Promise(resolve => setTimeout(resolve, 500));

            dispatch(openTerminal());
            dispatch(addHistory("Welcome to my world! 🐢\nType 'help' to view a list of available commands\nFeel free to click around, everything's interactive :)\nEnjoy your stay!"))
        } else {
            await animateAppOpen(controls);
        }

        dispatch(showTerminal());
    }

    return (
        <motion.div animate={controls} onClick={handleClick}>
            <div className='relative flex flex-col items-center'>
                <Image
                    src='/terminal_icons/terminal_icon.png'
                    width={50}
                    height={50}
                    alt='terminal icon'
                />
                {(terminalOpen && isDock) &&
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
    )
}