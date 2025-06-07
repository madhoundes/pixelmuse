import { useEffect, useState, useRef } from 'react';

const SUGGESTIONS = [
  "Trying to live on $10 a day 💸",
  "Reacting to my old cringy videos 😳",
  "Epic win moments in Fortnite 🎮",
  "How to edit videos for beginners 🎞️",
  "I built an app in 24 hours 💻",
  "My 30-day fitness transformation 💪",
  "Exploring hidden gems in my city 🏙️",
  "Top 10 budget travel hacks ✈️"
];

const TYPING_SPEED = 50; // Speed per character
const PAUSE_DURATION = 2500; // Increased pause between suggestions to 2.5 seconds
const CURSOR_BLINK_SPEED = 750; // Cursor blink speed

export function useTypewriterSuggestions(isInputEmpty: boolean) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const cursorRef = useRef<NodeJS.Timeout>();

  // Cursor blink effect
  useEffect(() => {
    const blinkCursor = () => {
      cursorRef.current = setInterval(() => {
        setShowCursor(prev => !prev);
      }, CURSOR_BLINK_SPEED);
    };

    if (!isTyping) {
      blinkCursor();
    } else {
      setShowCursor(true);
      if (cursorRef.current) clearInterval(cursorRef.current);
    }

    return () => {
      if (cursorRef.current) clearInterval(cursorRef.current);
    };
  }, [isTyping]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isInputEmpty || prefersReducedMotion) {
      setCurrentText('');
      setIsTyping(false);
      return;
    }

    const currentSuggestion = SUGGESTIONS[currentIndex];
    setIsTyping(true);

    if (currentText.length < currentSuggestion.length) {
      timeoutRef.current = setTimeout(() => {
        setCurrentText(currentSuggestion.slice(0, currentText.length + 1));
      }, TYPING_SPEED);
    } else {
      setIsTyping(false);
      timeoutRef.current = setTimeout(() => {
        setCurrentText('');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % SUGGESTIONS.length);
      }, PAUSE_DURATION);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentText, currentIndex, isInputEmpty]);

  return {
    text: currentText,
    showCursor,
    isTyping
  };
}