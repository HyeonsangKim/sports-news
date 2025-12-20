import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const BASE_URL = 'http://YOUR_BACKEND_URL/api'; // 백엔드 주소

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// 1. 요청 인터셉터: 헤더에 AccessToken 자동 주입
client.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 2. 응답 인터셉터: 401 발생 시 토큰 갱신 시도
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 재시도한 적이 없다면
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken, setTokens, logout } = useAuthStore.getState();

      if (!refreshToken) {
        // 리프레시 토큰도 없으면 로그아웃
        logout();
        return Promise.reject(error);
      }

      try {
        // 토큰 갱신 요청
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        // 새 토큰 저장
        setTokens(data.accessToken, data.refreshToken);

        // 실패했던 요청의 헤더 업데이트 후 재요청
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return client(originalRequest);
      } catch (refreshError) {
        // 갱신 실패 시 로그아웃 처리
        logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default client;
