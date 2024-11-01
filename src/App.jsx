import React, { useEffect, useRef, useState } from 'react';
import StarsComp from './Components/StarsComp';
import { Canvas } from '@react-three/fiber';
import { Fireworks } from 'fireworks-js';
import './App.css';
import NameModal from './Components/NameModal/NameModal';

const App = () => {
  const fireworksRef = useRef(null);
  const containerRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(true);

  const [wish, setWish] = useState("")

  useEffect(() => {
    const container = containerRef.current;

    // Initialize fireworks only if the container is available
    if (container) {
      fireworksRef.current = new Fireworks(container, {
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 50,
        traceLength: 3,
        traceSpeed: 10,
        explosion: 5,
        intensity: 60,
        flickering: 50,
        lineStyle: 'round',
        hue: {
          min: 0,
          max: 360
        },
        delay: {
          min: 30,
          max: 60
        },
        rocketsPoint: {
          min: 50,
          max: 50
        },
        lineWidth: {
          explosion: {
            min: 1,
            max: 3
          },
          trace: {
            min: 1,
            max: 2
          }
        },
        brightness: {
          min: 50,
          max: 80
        },
        decay: {
          min: 0.015,
          max: 0.03
        },
        mouse: {
          click: false,
          move: false,
          max: 1
        },
        sound: {
          enabled: true,
          files: [
            "/fireworks-1.mp3"
          ],
          volume: {
            min: 4,
            max: 20
          }
        }
      });

      fireworksRef.current.start(); // Start fireworks
      console.log('Fireworks started');
    }

    return () => {
      if (fireworksRef.current) {
        // fireworksRef.current.stop(); // Stop fireworks on unmount
        fireworksRef.current = null; // Clean up reference
        console.log('Fireworks stopped');
      }
    };
  }, [wish]);

  return (
    <>
      <Canvas style={{ background: 'linear-gradient(to bottom, #e1e1e1 -15%, black 40%)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <StarsComp />
      </Canvas>
      {wish && <div ref={containerRef} className="fireworks-container">
      </div>}
      {wish && <div className="message-container">
        <h1>Happy Diwali!</h1>
        <p className="wish-message">
          {wish}
        </p>
        <p className="name">- Pritam</p>
      </div>}
      <NameModal isOpen={modalOpen} onClose={() => setModalOpen(false)} setWish={setWish} />
    </>
  );
}

export default App;
