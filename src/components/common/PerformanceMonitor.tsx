import { useEffect } from 'react';

// Simple performance monitoring for Core Web Vitals
export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Report Web Vitals if available
    if ('web-vital' in window) {
      const reportWebVitals = (metric: any) => {
        console.log('Web Vital:', metric);
        // You can send this data to your analytics service
      };

      // Listen for Web Vitals
      if (typeof window.webVitals?.getCLS === 'function') {
        window.webVitals.getCLS(reportWebVitals);
        window.webVitals.getFID(reportWebVitals);
        window.webVitals.getFCP(reportWebVitals);
        window.webVitals.getLCP(reportWebVitals);
        window.webVitals.getTTFB(reportWebVitals);
      }
    }

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn('Long task detected:', entry.duration + 'ms');
            }
          }
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });

        return () => {
          longTaskObserver.disconnect();
        };
      } catch (e) {
        // PerformanceObserver not supported
      }
    }
  }, []);

  return null;
}

declare global {
  interface Window {
    webVitals?: {
      getCLS: (callback: (metric: any) => void) => void;
      getFID: (callback: (metric: any) => void) => void;
      getFCP: (callback: (metric: any) => void) => void;
      getLCP: (callback: (metric: any) => void) => void;
      getTTFB: (callback: (metric: any) => void) => void;
    };
  }
}