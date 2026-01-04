// src/api/auth.ts
import client from './client';
import type {
  ApiResponse,
  EmailCheckData,
  EmailVerifyData,
  RegisterData,
  LoginData,
} from '../types/api';

// 회원가입 요청 데이터 타입 정의
interface RegisterParams {
  email: string;
  password: string;
  termsAgreed: boolean;
  privacyAgreed: boolean;
}

export const authApi = {
  // 1. 이메일 중복 체크 및 인증번호 발송
  checkEmail: async (email: string): Promise<ApiResponse<EmailCheckData>> => {
    const response = await client.post<ApiResponse<EmailCheckData>>(
      '/auth/email/check',
      { email }
    );
    return response.data;
  },

  // 2. 인증번호 검증
  verifyCode: async (
    email: string,
    code: string
  ): Promise<ApiResponse<EmailVerifyData>> => {
    const response = await client.post<ApiResponse<EmailVerifyData>>(
      '/auth/email/verify',
      { email, code }
    );
    console.log(response);

    return response.data;
  },

  // 3. 회원가입 완료
  register: async (
    params: RegisterParams
  ): Promise<ApiResponse<RegisterData>> => {
    const response = await client.post<ApiResponse<RegisterData>>(
      '/auth/signup',
      params
    );
    return response.data;
  },

  // 4. 로그인
  login: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<ApiResponse<LoginData>> => {
    const response = await client.post<ApiResponse<LoginData>>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },
};
