import React, { FC, useRef, useEffect } from 'react';
import ThreeLib from './ThreeLib';

const ThreeScene: FC = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            const { start, stop, animate, addCube, addGltf, addObj } = ThreeLib(ref.current);
            start();
            addCube();
            addGltf('./asset/wall/Wall.gltf');
            addGltf('./asset/floor/Floor.gltf');
            addObj('./asset/test/', 'AztecPyramid.obj', 'AztecPyramid.mtl');
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
