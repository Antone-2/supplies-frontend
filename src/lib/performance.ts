// Performance optimization utilities for the e-commerce platform

/**
 * Preload images for better user experience
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Preload multiple images
 */
export const preloadImages = async (urls: string[]): Promise<void> => {
  try {
    await Promise.all(urls.map(url => preloadImage(url)));
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

/**
 * Debounce function for search inputs
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function for scroll events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

/**
 * Lazy loading intersection observer
 */
export const createLazyLoadObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

/**
 * Check if device has slow connection
 */
export const isSlowConnection = (): boolean => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    return connection?.effectiveType === 'slow-2g' ||
      connection?.effectiveType === '2g' ||
      connection?.saveData === true;
  }
  return false;
};

/**
 * Optimize image loading based on device capabilities
 */
export const getOptimizedImageSize = (originalWidth: number, originalHeight: number): { width: number; height: number } => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const maxWidth = window.innerWidth;
  const isHighDensity = devicePixelRatio > 1;
  const isSlow = isSlowConnection();

  // Reduce quality for slow connections
  const qualityMultiplier = isSlow ? 0.7 : (isHighDensity ? 1.2 : 1);

  const targetWidth = Math.min(originalWidth * qualityMultiplier, maxWidth);
  const aspectRatio = originalHeight / originalWidth;

  return {
    width: Math.round(targetWidth),
    height: Math.round(targetWidth * aspectRatio)
  };
};

/**
 * Format currency with localization
 */
export const formatCurrency = (amount: number, currency: string = 'KES'): string => {
  try {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
};

/**
 * Memory usage monitor for development
 */
export const logMemoryUsage = (): void => {
  if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
    const memory = (performance as any).memory;
    console.log('Memory Usage:', {
      used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
      total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
    });
  }
};