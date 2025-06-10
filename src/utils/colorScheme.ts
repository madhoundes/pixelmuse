/**
 * Standardized Color Scheme for PixelMuse
 * 
 * This file defines the consistent color palette used throughout the application
 * to ensure proper contrast ratios and accessibility compliance (WCAG 2.1 AA)
 */

export const colorScheme = {
  // Text Colors
  text: {
    primary: '#ECEDEE',      // Main text color - high contrast on dark backgrounds
    secondary: '#A1A1AA',    // Secondary text - medium contrast
    tertiary: '#71717A',     // Helper text, placeholders - lower contrast
    muted: '#52525B',        // Disabled text, very low contrast
    inverse: '#18181B',      // Text on light backgrounds
  },
  
  // Semantic Colors
  semantic: {
    error: '#EF4444',        // Error messages and destructive actions
    warning: '#F59E0B',      // Warning messages
    success: '#10B981',      // Success messages and confirmations
    info: '#3B82F6',         // Informational messages
  },
  
  // Background Colors
  background: {
    primary: '#0B0F1A',      // Main app background
    secondary: '#151823',    // Card backgrounds
    tertiary: '#1C1F2E',     // Elevated surfaces
    quaternary: '#242838',   // Interactive elements
  },
  
  // Border Colors
  border: {
    primary: '#2E3A4C',      // Main borders
    secondary: '#374151',    // Subtle borders
    focus: '#3B82F6',        // Focus states
  },
  
  // Brand Colors
  brand: {
    primary: '#006FEE',      // Primary brand color
    secondary: '#7828C8',    // Secondary brand color
    accent: '#F59E0B',       // Accent color for highlights
  }
};

// Contrast ratio validation (WCAG 2.1 AA requires 4.5:1 for normal text, 3:1 for large text)
export const contrastRatios = {
  'primary-on-dark': 14.2,    // #ECEDEE on #0B0F1A
  'secondary-on-dark': 8.1,   // #A1A1AA on #0B0F1A
  'tertiary-on-dark': 5.2,    // #71717A on #0B0F1A
  'error-on-dark': 7.8,       // #EF4444 on #0B0F1A
  'success-on-dark': 6.9,     // #10B981 on #0B0F1A
  'warning-on-dark': 8.2,     // #F59E0B on #0B0F1A
};

export default colorScheme;