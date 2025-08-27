import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition < 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only show on home page
  if (location.pathname !== '/') {
    return null;
  }

  return (
    <div>
    </div>
  );
}
