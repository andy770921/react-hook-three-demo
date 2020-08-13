import React, { FC, useRef, useEffect } from 'react';
import ThreeLib from './ThreeLib';

const ThreeScene: FC = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            const { start, stop, animate, addCube } = ThreeLib(ref.current);
            console.log('ref', ref);
            start();
            addCube();
            animate();
            return () => {
                stop();
            };
        }
    }, []);

    return <div style={{ width: '400px', height: '400px' }} ref={ref} />;
};

const App: FC = () => <ThreeScene />;

export default App;
