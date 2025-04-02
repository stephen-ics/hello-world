import React from 'react'
import TerminalApp from '../components/terminalApp'

export default function Dock() {
    return (
        <div className='w-full flex justify-center bottom-[0.75%] absolute'>
            <div className='w-1/2 h-[6vh] bg-gray-50 opacity-60 rounded-xl flex items-center'>
                <div className='mx-4'>
                    <TerminalApp />
                </div>
            </div>
        </div>
    );
}