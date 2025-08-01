import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openFinder, showFinder } from '../slices/applicationSlice'
import Image from 'next/image'
import { animateAppOpen, animateAppClose } from '../animations/appAnimations'
import { motion, useAnimation } from 'framer-motion'

export default function FinderApp({ isDock = false }) {
    const finderOpen = useSelector((state: any) => state.application.finderOpen)
    const controls = useAnimation();

    const dispatch = useDispatch();

    const handleClick = async () => {
        if(finderOpen === false) {
            await animateAppClose(controls);
    
            await new Promise(resolve => setTimeout(resolve, 500));

            dispatch(openFinder());
        } else {
            await animateAppOpen(controls);
        }

        dispatch(showFinder());
    }

    return (
        <motion.div animate={controls} onClick={handleClick}>
            <div className='relative flex flex-col items-center'>
                <Image
                    src='/app_icons/app_finder.png'
                    width={50}
                    height={50}
                    alt='terminal icon'
                />
                {(finderOpen && isDock) &&
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