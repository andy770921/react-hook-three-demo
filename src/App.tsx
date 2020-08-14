import React, { FC, useRef, useEffect } from 'react';
import ThreeLib from './ThreeLib';

const ThreeScene: FC = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            const { start, stop, animate, addGltf } = ThreeLib(ref.current);
            start();
            addGltf('./asset/wall/Wall.gltf'); // TODOS: cannot see obj. check position, size, color
            addGltf('./asset/floor/Floor.gltf');
            addGltf('./asset/warehouse_glass/Basement.gltf');
            addGltf('./asset/truck/Truck.gltf');
            addGltf('./asset/robot/robot_hi.gltf');
            addGltf('./asset/product_title/FeatureProduct_Title.gltf');
            addGltf('./asset/product_glass/SPACESHIP_ALL3_UVdone.gltf'); // TODOS: cannot see obj. check position, size, color
            addGltf('./asset/highlight_board_DRAM/Showcase.gltf'); // float above ground
            animate();
            return () => {
                stop();
            };
        }
    }, []);

    return <div style={{ width: '600px', height: '600px' }} ref={ref} />;
};

const App: FC = () => <ThreeScene />;

export default App;
