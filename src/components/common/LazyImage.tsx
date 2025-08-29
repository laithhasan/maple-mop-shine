import { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  onLoad?: () => void;
  style?: React.CSSProperties;
}

export default function LazyImage({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo=',
  loading = 'lazy',
  decoding = 'async',
  onLoad,
  style,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const { ref, isIntersecting, hasBeenVisible } = useIntersectionObserver<HTMLImageElement>({
    freezeOnceVisible: true,
    threshold: 0.1,
    rootMargin: '100px',
  });

  useEffect(() => {
    if ((isIntersecting || hasBeenVisible) && currentSrc === placeholder) {
      setCurrentSrc(src);
    }
  }, [isIntersecting, hasBeenVisible, src, currentSrc, placeholder]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setCurrentSrc(placeholder);
  };

  return (
    <img
      ref={ref}
      src={currentSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${
        isLoaded && !hasError ? 'opacity-100' : 'opacity-70'
      } ${className}`}
      loading={loading}
      decoding={decoding}
      onLoad={handleLoad}
      onError={handleError}
      style={style}
    />
  );
}