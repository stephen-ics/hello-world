import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openTerminal, showTerminal } from '../slices/applicationSlice'
import { addHistory } from '../slices/terminalSlice'
import Image from 'next/image'
import { animateAppOpen, animateAppClose } from '../animations/appAnimations'
import { motion, useAnimation } from 'framer-motion'

export default function Terminal() {
    const terminalOpen = useSelector(state => state.application.terminalOpen)
    const controls = useAnimation();

    const dispatch = useDispatch();

    const handleClick = async () => {
        if(terminalOpen === false) {
            await animateAppClose(controls);
    
            await new Promise(resolve => setTimeout(resolve, 500));

            dispatch(openTerminal());
            dispatch(addHistory("begin message"))
        } else {
            await animateAppOpen(controls);
        }

        dispatch(showTerminal());
    }

    return (
        <motion.div animate={controls} onClick={handleClick}>
            <Image
                src='/terminal_icons/terminal_icon.png'
                width={50}
                height={50}
                alt='terminal icon'
            />
        </motion.div>
    )
}