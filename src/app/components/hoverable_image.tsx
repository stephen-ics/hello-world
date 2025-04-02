import Image from 'next/image'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeTerminal } from '../slices/applicationSlice'

type HoverableImageProps = {
    srcDefault: string;
    srcHover: string;
    width: number;
    height: number;
    alt: string;
};

export default function HoverableImage({ srcDefault, srcHover, width, height, alt }: HoverableImageProps) {
    const [hover, setHover] = useState(false);
    const dispatch = useDispatch();

    return (
        <div 
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className='mx-1'
        >
            <Image
                src={hover ? srcHover : srcDefault}
                width={width}
                height={height}
                alt={alt}
                onClick={() => dispatch(closeTerminal())}
            />
        </div>
    );
}