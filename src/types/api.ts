/* eslint-disable @typescript-eslint/no-explicit-any */
// 공통 API 응답 구조
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  errorCode?: string;
}

// 이메일 중복 확인 응답 데이터
export interface EmailCheckData {
  available: boolean;
  message: string;
}

// 이메일 인증번호 확인 응답 데이터
export interface EmailVerifyData {
  verified: boolean;
  verificationToken: string;
}

// 회원가입 응답 데이터
export interface RegisterData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    userId: number;
    email: string;
    username: string;
    profileImageUrl: string;
    newUser: boolean;
  };
}

// 로그인 응답 데이터
export interface LoginData {
  accessToken: string;
  refreshToken: string;
  user?: {
    id: string;
    email: string;
    nickname?: string;
  };
}
