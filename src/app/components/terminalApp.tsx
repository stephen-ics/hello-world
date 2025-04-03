import React from 'react'
import { useDispatch } from 'react-redux'
import { openTerminal } from '../slices/applicationSlice'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'

export default function Terminal() {
    const dispatch = useDispatch()
    const controls = useAnimation()

    const handleClick = async () => {
        await controls.start({
            y: [0, -10, 0],
            transition: {
                duration: 0.6,
                times: [0, 0.5, 1],
                ease: 'easeOut'
            }
        })

        await new Promise(resolve => setTimeout(resolve, 500))

        dispatch(openTerminal())
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