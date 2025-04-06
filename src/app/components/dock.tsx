import React from 'react'
import TerminalApp from '../components/terminalApp'

export default function Dock() {
    return (
        <div className='w-full flex justify-center bottom-[0.75%] absolute'>
            <div
            className='w-1/2 h-[6vh] rounded-xl flex items-center'
            style={{ backgroundColor: 'rgba(249, 250, 251, 0.70)' }} // gray-50 with 60% opacity
            >
                <div className='mx-4'>
                    <TerminalApp isDock={true} />
                </div>
            </div>
        </div>
    );
}