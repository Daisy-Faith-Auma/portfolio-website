/**
 * Environment configuration utilities
 */

export const env = {
  // Feature flags
  enableAnimations: import.meta.env.VITE_ENABLE_ANIMATIONS === 'true',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  
  // Analytics
  googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
  plausibleDomain: import.meta.env.VITE_PLAUSIBLE_DOMAIN,
  
  // Contact
  contactFormEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT,
  
  // Performance monitoring
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  
  // Environment info
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const

/**
 * Validates that required environment variables are set
 */
export function validateEnv(): void {
  const requiredVars: (keyof typeof env)[] = []
  
  for (const varName of requiredVars) {
    if (!env[varName]) {
      console.warn(`Missing required environment variable: ${varName}`)
    }
  }
}

/**
 * Gets environment variable with fallback
 */
export function getEnvVar(key: string, fallback: string = ''): string {
  return import.meta.env[key] || fallback
}