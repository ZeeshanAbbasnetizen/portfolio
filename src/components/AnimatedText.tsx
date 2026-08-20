import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="opacity-0">{char}</span>
      <motion.span style={{ opacity }} className="absolute inset-0 select-none">
        {char}
      </motion.span>
    </span>
  );
};

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  wordStartIndex: number;
  totalChars: number;
}

const Word: React.FC<WordProps> = ({ word, progress, wordStartIndex, totalChars }) => {
  const characters = word.split('');
  return (
    <span className="inline-block whitespace-nowrap mr-[0.28em]">
      {characters.map((char, i) => {
        const charIndex = wordStartIndex + i;
        const start = charIndex / totalChars;
        const end = (charIndex + 1) / totalChars;
        return (
          <Character
            key={i}
            char={char}
            progress={progress}
            range={[start, end]}
          />
        );
      })}
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  const words = text.split(' ');
  let charCounter = 0;
  const wordPositions: number[] = [];

  words.forEach((word) => {
    wordPositions.push(charCounter);
    charCounter += word.length + 1; // +1 for the space
  });

  const totalChars = charCounter;

  return (
    <p
      ref={containerRef}
      className={`text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] mx-auto text-[clamp(1rem,2vw,1.35rem)] flex flex-wrap justify-center ${className}`}
    >
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          progress={scrollYProgress}
          wordStartIndex={wordPositions[i]}
          totalChars={totalChars}
        />
      ))}
    </p>
  );
};
