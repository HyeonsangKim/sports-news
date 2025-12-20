/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/authMock.ts

// 딜레이를 줘서 실제 네트워크처럼 느끼게 함 (0.5초)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
  // 이메일 중복 확인 Mock
  checkEmail: async (email: string) => {
    await delay(500);
    if (email === 'duplicate@test.com') {
      // 409 에러 흉내
      return Promise.reject({ response: { status: 409 } });
    }
    return { status: 200, message: '사용 가능' };
  },

  // 로그인 Mock
  login: async (email: string, pass: string) => {
    await delay(500);
    if (email === 'test@test.com' && pass === '1234') {
      return {
        data: {
          accessToken: 'mock_access_token_' + Date.now(),
          refreshToken: 'mock_refresh_token_' + Date.now(),
          user: {
            id: '1',
            email: email,
            name: '테스트유저',
            provider: 'email',
          },
        },
      };
    }
    throw new Error('로그인 실패');
  },

  // 회원가입 Mock
  register: async (data: any) => {
    await delay(800);
    return { status: 200, message: '가입 성공' };
  },
};
