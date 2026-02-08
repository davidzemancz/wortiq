import { useState, useEffect, useCallback, useRef } from 'react';

export default function useTypewriter(words, {
  typeSpeed = 80,
  deleteSpeed = 50,
  pauseTime = 2000,
} = {}) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      setText(currentWord.substring(0, text.length - 1));
    } else {
      setText(currentWord.substring(0, text.length + 1));
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && text === currentWord) {
      delay = pauseTime;
      setIsDeleting(true);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      delay = typeSpeed;
    }

    timeoutRef.current = setTimeout(tick, delay);
  }, [text, wordIndex, isDeleting, words, typeSpeed, deleteSpeed, pauseTime]);

  useEffect(() => {
    timeoutRef.current = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timeoutRef.current);
  }, [tick, typeSpeed]);

  return text;
}
