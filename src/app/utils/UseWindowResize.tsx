import { useEffect, useState } from 'react';

const UseWindowResize = () => {
    const [windowSize, setWindowSize] = useState<any>({
        width: undefined,
        height: undefined
    });
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return windowSize;
};

export default UseWindowResize;
