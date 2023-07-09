/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      // {
      //   source: '/home', // 상담자 홈
      //   destination: '/clients',
      // },
      {
        source: '/home', // 내담자 홈 (내담자인 경우만 rewrite)
        has: [
          // {
          //   type: 'header',
          //   key: 'x-authorized', // to be modified
          // },
        ],
        destination: '/records',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/', // 로그인 후 랜딩페이지 접근 막기 (기획 질문드리기)
        has: [
          {
            type: 'header',
            key: 'x-authorized', // to be modified
            value: '(?<authorized>yes|true)',
          },
        ],
        permanent: false,
        destination: '/home',
      },
      {
        source: '/log', // 상담사 접근 막기
        has: [
          {
            type: 'header',
            key: 'x-authorized', // to be modified
            value: '(?<authorized>yes|true)',
          },
        ],
        permanent: false,
        destination: '/home',
      },
      {
        source: '/clients', // 상담사 접근 막기 (rewrite)
        has: [
          {
            type: 'header',
            key: 'x-authorized', // to be modified
            value: '(?<authorized>yes|true)',
          },
        ],
        permanent: false,
        destination: '/home',
      },
      {
        source: '/clients', // 내담자 접근 막기
        has: [
          {
            type: 'header',
            key: 'x-authorized', // to be modified
            value: '(?<authorized>yes|true)',
          },
        ],
        permanent: false,
        destination: '/home',
      },
      {
        source: '/records', // 내담자 접근 막기 (rewrite)
        has: [
          {
            type: 'header',
            key: 'x-authorized', // to be modified
            value: '(?<authorized>yes|true)',
          },
        ],
        permanent: false,
        destination: '/home',
      },
    ];
  },
};

module.exports = nextConfig;
