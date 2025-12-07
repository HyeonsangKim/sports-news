import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  provider: 'google' | 'apple' | 'kakao';
}

interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;

  login: (
    tokens: { accessToken: string; refreshToken: string },
    user: User
  ) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

const TOKEN_KEY = '@auth_tokens';
const REFRESH_TOKEN_KEY = '@refresh_token';
const USER_KEY = '@user';

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  accessToken: null,
  refreshToken: null,
  user: null,

  // 로그인 함수
  login: async (tokens, user) => {
    try {
      await AsyncStorage.multiSet([
        [TOKEN_KEY, tokens.accessToken],
        [REFRESH_TOKEN_KEY, tokens.refreshToken],
        [USER_KEY, JSON.stringify(user)],
      ]);

      set({
        isAuthenticated: true,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: user,
        isLoading: false,
      });

      console.log('로그인 성공', user.email);
    } catch (error) {
      console.error('로그인 실패', error);
      throw error;
    }
  },

  // 로그아웃 함수
  logout: async () => {
    try {
      await AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY]);

      set({
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        user: null,
      });

      console.log('로그아웃 성공');
    } catch (error) {
      console.error('로그아웃 실패', error);
      throw error;
    }
  },

  // 앱 시작 시 자동 로그인 체크
  checkAuth: async () => {
    try {
      // AsyncStorage에서 데이터 읽기
      const [[, accessToken], [, refreshToken], [, userStr]] =
        await AsyncStorage.multiGet([TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY]);

      if (accessToken && refreshToken && userStr) {
        const user = JSON.parse(userStr) as User;

        set({
          isAuthenticated: true,
          accessToken,
          refreshToken,
          user,
          isLoading: false,
        });

        console.log('자동 로그인 성공', user.email);
      } else {
        set({ isLoading: false });
        console.log('저장된 로그인 정보 없음');
      }
    } catch (error) {
      console.error('인증 체크 실패', error);
      set({ isLoading: false });
    }
  },

  // 로딩 상태 변경
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
