import React from 'react'
import { useDispatch } from 'react-redux'
import { openTerminal, closeTerminal } from '../slices/applicationSlice' 

export default function Terminal() {
    const dispatch = useDispatch()

    return (
        <div>
            <button onClick={() => dispatch(openTerminal())} className='w-20 h-20 bg-black text-white'>open terminal</button>
            <button onClick={() => dispatch(closeTerminal())} className='w-20 h-20 bg-white'>close terminal</button>
        </div>
    );
}