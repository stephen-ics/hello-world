import React from 'react'
import { useDispatch } from 'react-redux'
import { openTerminal } from '../slices/applicationSlice'
import Image from 'next/image' 

export default function Terminal() {
    const dispatch = useDispatch()

    return (
        <Image
            src='/terminal_icons/terminal_icon.png'
            width={50}
            height={50}
            alt='terminal icon'
            onClick={() => dispatch(openTerminal())}
        >

        </Image>
    );
}