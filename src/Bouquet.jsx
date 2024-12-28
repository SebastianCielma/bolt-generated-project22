import React from 'react';
    import { useSpring, animated } from 'react-spring';

    function AnimatedFlower({ style }) {
      return <animated.span style={style} className="flower">🌸</animated.span>;
    }

    function Bouquet() {
      const flowerStyles = [
        useSpring({ from: { transform: 'translate(0, 0) rotate(0deg)' }, to: { transform: 'translate(-50px, -50px) rotate(-20deg)' }, config: { duration: 3000 }, loop: true }),
        useSpring({ from: { transform: 'translate(0, 0) rotate(0deg)' }, to: { transform: 'translate(50px, -50px) rotate(20deg)' }, config: { duration: 3000 }, loop: true }),
        useSpring({ from: { transform: 'translate(0, 0) rotate(0deg)' }, to: { transform: 'translate(-30px, -100px) rotate(-10deg)' }, config: { duration: 3000 }, loop: true }),
        useSpring({ from: { transform: 'translate(0, 0) rotate(0deg)' }, to: { transform: 'translate(30px, -100px) rotate(10deg)' }, config: { duration: 3000 }, loop: true }),
        useSpring({ from: { transform: 'translate(0, 0) rotate(0deg)' }, to: { transform: 'translate(0px, -150px) rotate(0deg)' }, config: { duration: 3000 }, loop: true }),
        useSpring({ from: { transform: 'translate(0, 0) rotate(0deg)' }, to: { transform: 'translate(-60px, -150px) rotate(-25deg)' }, config: { duration: 3000 }, loop: true }),
        useSpring({ from: { transform: 'translate(0, 0) rotate(0deg)' }, to: { transform: 'translate(60px, -150px) rotate(25deg)' }, config: { duration: 3000 }, loop: true }),
      ];

      return (
        <div className="bouquet">
          {flowerStyles.map((style, index) => (
            <AnimatedFlower key={index} style={style} />
          ))}
        </div>
      );
    }

    export default Bouquet;
