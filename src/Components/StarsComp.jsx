import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const StarsComp = () => {
    const starsRef = useRef();

    useFrame(() => {
        // Rotate the stars slowly over time
        starsRef.current.rotation.x += 0.0005;
        starsRef.current.rotation.y += 0.0005;
    });

    return (
        <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} fade />
    );

}

export default StarsComp