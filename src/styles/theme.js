// Theme configuration for styled-components
export const lightTheme = {
  colors: {
    // --- New Blue Gradient Light Theme ---
    // Primary Accent: Royal Blue
    primary: '#3B82F6',
    primaryHover: '#2563EB',
    primaryLight: '#60A5FA',
    primaryDark: '#1E40AF',

    // Secondary Accent: Aqua Blue
    secondary: '#06B6D4',
    secondaryHover: '#0891B2',
    secondaryLight: '#67E8F9',
    secondaryDark: '#0E7490',

    // Tertiary Accent: Indigo
    accent: '#6366F1',
    accentHover: '#4F46E5',
    accentLight: '#A5B4FC',
    accentDark: '#4338CA',

    // Status Colors
    success: '#10B981',
    successLight: '#d1fae5',
    successDark: '#047857',

    error: '#EF4444',
    errorLight: '#fecaca',
    errorDark: '#dc2626',

    warning: '#F59E0B',
    warningLight: '#fef3c7',
    warningDark: '#d97706',

    info: '#3B82F6',
    infoLight: '#dbeafe',
    infoDark: '#2563eb',

    // Neutral colors
    white: '#ffffff',
    black: '#000000',

    // Semantic colors from the new blue palette
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', // Sky Blue Gradient
    surface: '#FFFFFF',         // Ice White
    surfaceHover: '#f0f9ff',    // Light Breeze

    textPrimary: '#1E3A8A',     // Midnight Blue
    textSecondary: '#475569',   // Steel Blue
    textTertiary: '#94A3B8',    // Haze Gray (for muted/disabled)
    textInverse: '#ffffff',

    border: '#E0E7FF',          // Frost
    borderLight: '#F0F9FF',
    borderDark: '#C7D2FE',

    // Gray scale (can be kept for other uses if needed)
    gray50: '#f9fafb',   // Corresponds to Background
    gray100: '#f3f4f6',  // Corresponds to Hover Background
    gray200: '#e5e7eb',  // Corresponds to Border
    gray300: '#d1d5db',
    gray400: '#9ca3af',  // Corresponds to Muted Text
    gray500: '#6b7280',
    gray600: '#4b5563',  // Corresponds to Text Secondary
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',  // Corresponds to Text Primary

    // Email category colors
    inbox: '#6366f1',
    spam: '#ef4444',
    promotions: '#f59e0b',
    social: '#10b981',
    updates: '#8b5cf6',
    forums: '#06b6d4',
    important: '#f97316',

    // Chart colors
    chart: {
      primary: '#3b82f6',
      secondary: '#10b981',
      tertiary: '#f59e0b',
      quaternary: '#ef4444',
      quinary: '#8b5cf6',
      senary: '#06b6d4',
      septenary: '#f97316',
      octonary: '#84cc16',
    },
  },

  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      secondary: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
      mono: "'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace",
    },

    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
    },

    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },

    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },

    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
    },
  },

  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
    40: '10rem',    // 160px
    48: '12rem',    // 192px
    56: '14rem',    // 224px
    64: '16rem',    // 256px
  },

  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000',
  },

  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
    slower: '500ms ease-in-out',
  },

  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  components: {
    button: {
      padding: {
        sm: '0.5rem 1rem',
        md: '0.75rem 1.5rem',
        lg: '1rem 2rem',
      },
      borderRadius: '0.375rem',
    },

    input: {
      padding: '0.75rem 1rem',
      borderRadius: '0.375rem',
      borderWidth: '1px',
    },

    card: {
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    },
  },

  layout: {
    sidebar: {
      width: '280px',
      collapsedWidth: '80px',
    },
    header: {
      height: '64px',
    },
    content: {
      maxWidth: '1200px',
    },
  },

  animations: {
    fadeIn: 'fadeIn 0.3s ease-in-out',
    slideIn: 'slideInFromRight 0.3s ease-in-out',
    slideUp: 'slideInFromBottom 0.3s ease-in-out',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    spin: 'spin 1s linear infinite',
    bounce: 'bounce 1s infinite',
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,

    // New Dark Theme Palette
    primary: '#3B82F6',         // Electric Blue
    primaryHover: '#8B5CF6',    // Soft Violet (Used for hover)
    secondary: '#8B5CF6',       // Soft Violet
    
    background: '#121212',      // Charcoal Black
    surface: '#1E1E1E',         // Graphite Gray
    surfaceHover: '#2A2A2A',    // Deep Steel

    textPrimary: '#E5E7EB',     // Off White
    textSecondary: '#9CA3AF',   // Slate Gray
    textTertiary: '#6B7280',    // Dim Gray

    border: '#2D2D2D',          // Shadow Gray

    success: '#10B981',         // Emerald Green
    error: '#EF4444',           // Crimson Red
    warning: '#F59E0B',         // Amber
  },

  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.6), 0 8px 10px -6px rgb(0 0 0 / 0.6)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.7)',
    inner: 'inset 0 2px 4px 0 rgb(255 255 255 / 0.05)',
    none: '0 0 #0000',
  },
};

// Media query helpers
export const mediaQueries = {
  xs: `@media (min-width: ${lightTheme.breakpoints.xs})`,
  sm: `@media (min-width: ${lightTheme.breakpoints.sm})`,
  md: `@media (min-width: ${lightTheme.breakpoints.md})`,
  lg: `@media (min-width: ${lightTheme.breakpoints.lg})`,
  xl: `@media (min-width: ${lightTheme.breakpoints.xl})`,
  '2xl': `@media (min-width: ${lightTheme.breakpoints['2xl']})`,

  // Max width queries
  maxXs: `@media (max-width: ${parseInt(lightTheme.breakpoints.sm) - 1}px)`,
  maxSm: `@media (max-width: ${parseInt(lightTheme.breakpoints.md) - 1}px)`,
  maxMd: `@media (max-width: ${parseInt(lightTheme.breakpoints.lg) - 1}px)`,
  maxLg: `@media (max-width: ${parseInt(lightTheme.breakpoints.xl) - 1}px)`,
  maxXl: `@media (max-width: ${parseInt(lightTheme.breakpoints['2xl']) - 1}px)`,

  // Special queries
  mobile: '@media (max-width: 767px)',
  tablet: '@media (min-width: 768px) and (max-width: 1023px)',
  desktop: '@media (min-width: 1024px)',

  // Print and accessibility
  print: '@media print',
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
  highContrast: '@media (prefers-contrast: high)',
};

// CSS keyframes for animations
export const keyframes = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  slideInFromRight: `
    @keyframes slideInFromRight {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `,
  slideInFromBottom: `
    @keyframes slideInFromBottom {
      from {
        opacity: 0;
        transform: translateY(100%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  pulse: `
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }
  `,
  spin: `
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
  bounce: `
    @keyframes bounce {
      0%, 100% {
        transform: translateY(-25%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      }
      50% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
    }
  `,
};

// Utility functions
export const getTheme = (isDark = false) => {
  return isDark ? darkTheme : lightTheme;
};

export const hexToRgba = (hex, alpha = 1) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Default theme export
const theme = lightTheme;
export default theme;