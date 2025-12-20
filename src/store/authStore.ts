// src/store/useAuthStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  provider: 'email' | 'google' | 'apple' | 'kakao'; // email 추가
}

interface AuthStore {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;

  // 액션들
  login: (
    tokens: { accessToken: string; refreshToken: string },
    user: User
  ) => void;
  setTokens: (accessToken: string, refreshToken: string) => void; // 토큰 갱신용
  logout: () => void;
  updateUser: (user: Partial<User>) => void; // 프로필 수정 등
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      user: null,

      // 로그인: 상태만 바꾸면 persist가 알아서 저장함
      login: (tokens, user) => {
        set({
          isAuthenticated: true,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          user,
        });
      },

      // 토큰 갱신 (Axios Interceptor에서 사용)
      setTokens: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken });
      },

      // 로그아웃: 상태 초기화
      logout: () => {
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          user: null,
        });
      },

      // 유저 정보 업데이트 유틸
      updateUser: (updatedUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        })),
    }),
    {
      name: 'auth-storage', // AsyncStorage 키 이름
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
