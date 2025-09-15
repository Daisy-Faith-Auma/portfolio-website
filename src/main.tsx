import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { reportWebVitals } from './utils/performance'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register service worker for caching
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Report web vitals in development
if (import.meta.env.DEV) {
  import('web-vitals').then((webVitals) => {
    if (webVitals.onCLS) webVitals.onCLS(reportWebVitals);
    if (webVitals.onINP) webVitals.onINP(reportWebVitals);
    if (webVitals.onFCP) webVitals.onFCP(reportWebVitals);
    if (webVitals.onLCP) webVitals.onLCP(reportWebVitals);
    if (webVitals.onTTFB) webVitals.onTTFB(reportWebVitals);
  }).catch(() => {
    // web-vitals not available, continue without it
  });
}
