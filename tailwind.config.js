/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // sans: ['var(--default-font)'],
        sans: 'AppleSDGothicNeo',
        logo: ['var(--logo-font)'],
      },
      fontSize: {
        landingPageBody: [
          '3rem',
          { fontStyle: 'normal', fontWeight: '700', lineHeight: '4.8rem' },
        ],
        heading1: [
          '3.2rem',
          { fontStyle: 'normal', fontWeight: '800', lineHeight: '5.1rem' },
        ],
        heading2: [
          '2.6rem',
          { fontStyle: 'normal', fontWeight: '700', lineHeight: '4.2rem' },
        ],
        heading3: [
          '2.2rem',
          { fontStyle: 'normal', fontWeight: '600', lineHeight: '3.5rem' },
        ],
        heading4: [
          '1.8rem',
          { fontStyle: 'normal', fontWeight: '700', lineHeight: '2.9rem' },
        ],
        body1: [
          '1.8rem',
          { fontStyle: 'normal', fontWeight: '600', lineHeight: '2.9rem' },
        ],
        body2: [
          '1.6rem',
          { fontStyle: 'normal', fontWeight: '500', lineHeight: '2.5rem' },
        ],

        body3: [
          '1.4rem',
          { fontStyle: 'normal', fontWeight: '500', lineHeight: '2.2rem' },
        ],
        body4: [
          '1.2rem',
          { fontStyle: 'normal', fontWeight: '500', lineHeight: '2.2rem' },
        ],
        label1: [
          '1.2rem',
          { fontStyle: 'normal', fontWeight: '500', lineHeight: '1.2rem' },
        ],
        label2: [
          '1.0rem',
          { fontStyle: 'normal', fontWeight: '500', lineHeight: '1.2rem' },
        ],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#181818',
        yellow: {
          20: '#FFFCF0',
          100: '#FDF2B4',
          120: '#E3C309',
          disabled: '#DFD59E',
        },
        red: { 100: '#FF5757', 10: '#FFEEEE' },
        green: {
          100: '#2DEF7B',
          80: '#79F3AA',
          60: '#9AF6BF',
          40: '#BCF9D4',
          20: '#DCFCE9',
          text: '#006026',
        },
        blue: {
          100: '#61D0FF',
          80: '#79D7FFCC',
          60: '#79D7FF99',
          40: '#79D7FF66',
          20: '#79D7FF33',
          text: '#004C6C',
        },
        gray: {
          9: '#212121',
          8: '#737373',
          7: '#868686',
          6: '#999999',
          5: '#ACACAC',
          4: '#DCDCDC',
          3: '#EFEFEF',
          2: '#F7F7F7',
          1: '#FCFCFC',
          20: '#73737333',
          40: '#73737366',
          60: '#73737399',
          80: '#737373CC',
          100: '#737373',
        },
        background: '#F5F5F5',
      },
      boxShadow: {
        shadow: '0px 4px 14px 0px rgba(0, 0, 0, 0.09)',
      },
    },
  },
  plugins: [],
};
