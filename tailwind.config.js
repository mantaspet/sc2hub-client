/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          '100': 'var(--color-primary-100)',
          '200': 'var(--color-primary-200)',
          '300': 'var(--color-primary-300)',
          '400': 'var(--color-primary-400)',
          '500': 'var(--color-primary-500)',
          '600': 'var(--color-primary-600)',
          '700': 'var(--color-primary-700)',
          '800': 'var(--color-primary-800)',
          '900': 'var(--color-primary-900)',
          '1000': 'var(--color-primary-1000)',
        },
        neutral: {
          '100': 'var(--color-neutral-100)',
          '200': 'var(--color-neutral-200)',
          '300': 'var(--color-neutral-300)',
          '400': 'var(--color-neutral-400)',
          '500': 'var(--color-neutral-500)',
          '600': 'var(--color-neutral-600)',
          '700': 'var(--color-neutral-700)',
          '800': 'var(--color-neutral-800)',
          '900': 'var(--color-neutral-900)',
          '1000': 'var(--color-neutral-1000)',
        },
        supporting: {
          '100': 'var(--color-supporting-100)',
          '200': 'var(--color-supporting-200)',
          '300': 'var(--color-supporting-300)',
          '400': 'var(--color-supporting-400)',
          '500': 'var(--color-supporting-500)',
          '600': 'var(--color-supporting-600)',
          '700': 'var(--color-supporting-700)',
          '800': 'var(--color-supporting-800)',
          '900': 'var(--color-supporting-900)',
          '1000': 'var(--color-supporting-1000)',
        },
        positive: {
          '100': 'var(--color-positive-100)',
          '200': 'var(--color-positive-200)',
          '300': 'var(--color-positive-300)',
          '400': 'var(--color-positive-400)',
          '500': 'var(--color-positive-500)',
          '600': 'var(--color-positive-600)',
          '700': 'var(--color-positive-700)',
          '800': 'var(--color-positive-800)',
          '900': 'var(--color-positive-900)',
          '1000': 'var(--color-positive-1000)',
        },
        negative: {
          '100': 'var(--color-negative-100)',
          '200': 'var(--color-negative-200)',
          '300': 'var(--color-negative-300)',
          '400': 'var(--color-negative-400)',
          '500': 'var(--color-negative-500)',
          '600': 'var(--color-negative-600)',
          '700': 'var(--color-negative-700)',
          '800': 'var(--color-negative-800)',
          '900': 'var(--color-negative-900)',
          '1000': 'var(--color-negative-1000)',
        },
      },
      inset: {
        '-16': '-4rem',
      },
      screens: {
        sm: '520px',
        md: '960px',
        lg: '1264px',
        xl: '1904px',
      },
      transitionProperty: {
        height: 'height',
        inset: 'bottom',
      },
    },
  },
  variants: {
    backgroundColor: ['hover', 'focus', 'active'],
    textColor: ['hover', 'focus', 'active'],
  },
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
};
