import Image from 'next/image'
import { useState } from 'react'

type HoverableImageProps = {
    srcDefault: string;
    srcHover: string;
    width: number;
    height: number;
    alt: string;
    handleClick: () => void;
};

export default function HoverableImage({ srcDefault, srcHover, width, height, alt, handleClick }: HoverableImageProps) {
    const [hover, setHover] = useState(false);

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
                onClick={handleClick}
            />
        </div>
    );
}