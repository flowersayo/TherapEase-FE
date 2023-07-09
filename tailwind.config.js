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
          '30px',
          { fontStyle: 'normal', fontWeight: '700', lineHeight: '48px' },
        ],
        heading1: [
          '32px',
          { fontStyle: 'normal', fontWeight: '800', lineHeight: '51px' },
        ],
        heading2: [
          '26px',
          { fontStyle: 'normal', fontWeight: '700', lineHeight: '42px' },
        ],
        heading3: [
          '22px',
          { fontStyle: 'normal', fontWeight: '600', lineHeight: '35px' },
        ],
        heading4: [
          '18px',
          { fontStyle: 'normal', fontWeight: '700', lineHeight: '29px' },
        ],
        body1: [
          '18px',
          { fontStyle: 'normal', fontWeight: '600', lineHeight: '29px' },
        ],
        body2: [
          '16px',
          { fontStyle: 'normal', fontWeight: '500', lineHeight: '25px' },
        ],
        body3: [
          '14px',
          { fontStyle: 'normal', fontWeight: '500', lineHeight: '22px' },
        ],
        body4: [
          '12px',
          { fontStyle: 'normal', fontWeight: '500', lineHeight: '22px' },
        ],
        label1: [
          '12px',
          { fontStyle: 'normal', fontWeight: '500', lineHeight: '12px' },
        ],
        label2: [
          '10px',
          { fontStyle: 'normal', fontWeight: '500', lineHeight: '12px' },
        ],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
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
