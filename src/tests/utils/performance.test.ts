import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  measurePerformance,
  reportWebVitals,
  createIntersectionObserver,
  debounce,
  throttle,
  preloadResource,
  prefersReducedMotion
} from '../../utils/performance';

describe('Performance Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset console.log mock
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('measurePerformance', () => {
    it('measures and logs performance when performance API is available', () => {
      const mockPerformance = {
        now: vi.fn()
          .mockReturnValueOnce(100) // start time
          .mockReturnValueOnce(150) // end time
      };
      
      Object.defineProperty(window, 'performance', {
        value: mockPerformance,
        writable: true
      });

      const testFunction = vi.fn();
      
      measurePerformance('test operation', testFunction);
      
      expect(testFunction).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('test operation took 50 milliseconds');
    });

    it('executes function without measuring when performance API is not available', () => {
      // Mock performance as undefined
      const originalPerformance = global.performance;
      // @ts-ignore
      delete global.performance;

      const testFunction = vi.fn();
      
      measurePerformance('test operation', testFunction);
      
      expect(testFunction).toHaveBeenCalled();
      expect(console.log).not.toHaveBeenCalled();
      
      // Restore performance
      global.performance = originalPerformance;
    });

    it('works in non-browser environment', () => {
      // Mock window as undefined
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;

      const testFunction = vi.fn();
      
      measurePerformance('test operation', testFunction);
      
      expect(testFunction).toHaveBeenCalled();
      expect(console.log).not.toHaveBeenCalled();

      // Restore window
      global.window = originalWindow;
    });
  });

  describe('reportWebVitals', () => {
    it('logs metrics in development environment', () => {
      // Mock development environment
      vi.stubEnv('DEV', true);

      const metric = {
        name: 'CLS',
        value: 0.1,
        id: 'test-id'
      };

      reportWebVitals(metric);

      expect(console.log).toHaveBeenCalledWith(metric);
    });

    it('does not log metrics in production environment', () => {
      // Mock production environment
      vi.stubEnv('DEV', false);

      const metric = {
        name: 'CLS',
        value: 0.1,
        id: 'test-id'
      };

      reportWebVitals(metric);

      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe('createIntersectionObserver', () => {
    it('creates IntersectionObserver when available', () => {
      const mockObserver = {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn()
      };

      const MockIntersectionObserver = vi.fn(() => mockObserver);
      Object.defineProperty(window, 'IntersectionObserver', {
        value: MockIntersectionObserver,
        writable: true
      });

      const callback = vi.fn();
      const options = { threshold: 0.5 };

      const observer = createIntersectionObserver(callback, options);

      expect(MockIntersectionObserver).toHaveBeenCalledWith(callback, {
        rootMargin: '50px',
        threshold: 0.5
      });
      expect(observer).toBe(mockObserver);
    });

    it('returns null when IntersectionObserver is not available', () => {
      const originalIntersectionObserver = global.IntersectionObserver;
      // @ts-ignore
      delete global.IntersectionObserver;

      const callback = vi.fn();
      const observer = createIntersectionObserver(callback);

      expect(observer).toBeNull();
      
      // Restore IntersectionObserver
      global.IntersectionObserver = originalIntersectionObserver;
    });

    it('uses default options when none provided', () => {
      const mockObserver = {};
      const MockIntersectionObserver = vi.fn(() => mockObserver);
      Object.defineProperty(window, 'IntersectionObserver', {
        value: MockIntersectionObserver,
        writable: true
      });

      const callback = vi.fn();
      createIntersectionObserver(callback);

      expect(MockIntersectionObserver).toHaveBeenCalledWith(callback, {
        rootMargin: '50px',
        threshold: 0.1
      });
    });
  });

  describe('debounce', () => {
    it('delays function execution', async () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc('arg1', 'arg2');
      expect(func).not.toHaveBeenCalled();

      // Wait for debounce delay
      await new Promise(resolve => setTimeout(resolve, 150));
      expect(func).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('cancels previous calls when called multiple times', async () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 100);

      debouncedFunc('first');
      debouncedFunc('second');
      debouncedFunc('third');

      await new Promise(resolve => setTimeout(resolve, 150));
      
      expect(func).toHaveBeenCalledTimes(1);
      expect(func).toHaveBeenCalledWith('third');
    });

    it('preserves function arguments and context', async () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 50);

      debouncedFunc(1, 2, 3);

      await new Promise(resolve => setTimeout(resolve, 100));
      expect(func).toHaveBeenCalledWith(1, 2, 3);
    });
  });

  describe('throttle', () => {
    it('limits function execution frequency', async () => {
      const func = vi.fn();
      const throttledFunc = throttle(func, 100);

      throttledFunc('arg1');
      throttledFunc('arg2');
      throttledFunc('arg3');

      expect(func).toHaveBeenCalledTimes(1);
      expect(func).toHaveBeenCalledWith('arg1');

      // Wait for throttle limit to reset
      await new Promise(resolve => setTimeout(resolve, 150));
      
      throttledFunc('arg4');
      expect(func).toHaveBeenCalledTimes(2);
      expect(func).toHaveBeenLastCalledWith('arg4');
    });

    it('executes immediately on first call', () => {
      const func = vi.fn();
      const throttledFunc = throttle(func, 100);

      throttledFunc('immediate');
      expect(func).toHaveBeenCalledWith('immediate');
    });
  });

  describe('preloadResource', () => {
    it('creates and appends preload link element', () => {
      const mockLink = {
        rel: '',
        href: '',
        as: ''
      };
      const mockHead = {
        appendChild: vi.fn()
      };

      document.createElement = vi.fn(() => mockLink as any);
      Object.defineProperty(document, 'head', {
        value: mockHead,
        writable: true
      });

      preloadResource('/test.css', 'style');

      expect(document.createElement).toHaveBeenCalledWith('link');
      expect(mockLink.rel).toBe('preload');
      expect(mockLink.href).toBe('/test.css');
      expect(mockLink.as).toBe('style');
      expect(mockHead.appendChild).toHaveBeenCalledWith(mockLink);
    });

    it('does nothing in non-browser environment', () => {
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;

      const createElement = vi.fn();
      document.createElement = createElement;

      preloadResource('/test.css', 'style');

      expect(createElement).not.toHaveBeenCalled();

      // Restore window
      global.window = originalWindow;
    });
  });

  describe('prefersReducedMotion', () => {
    it('returns true when user prefers reduced motion', () => {
      const mockMatchMedia = vi.fn(() => ({
        matches: true
      }));
      Object.defineProperty(window, 'matchMedia', {
        value: mockMatchMedia,
        writable: true
      });

      const result = prefersReducedMotion();

      expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
      expect(result).toBe(true);
    });

    it('returns false when user does not prefer reduced motion', () => {
      const mockMatchMedia = vi.fn(() => ({
        matches: false
      }));
      Object.defineProperty(window, 'matchMedia', {
        value: mockMatchMedia,
        writable: true
      });

      const result = prefersReducedMotion();

      expect(result).toBe(false);
    });

    it('returns false in non-browser environment', () => {
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;

      const result = prefersReducedMotion();

      expect(result).toBe(false);

      // Restore window
      global.window = originalWindow;
    });
  });
});