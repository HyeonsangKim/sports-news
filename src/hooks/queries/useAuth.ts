import { useMutation } from '@tanstack/react-query';
import { UseMutationCustomOptions } from '../../types/reactQuery';
import { authApi } from '../../api/auth';
import { useAuthStore } from '../../store/authStore';

function useKakaoLogin(mutationOptions?: UseMutationCustomOptions) {
  const setToken = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: authApi.kakaoLogin,
    onSuccess: (res) => {
      // TODO: 응답 데이터 구조에 따라 조정 필요
      const { accessToken, refreshToken } = res.data;

      setToken(accessToken, refreshToken);
    },
    ...mutationOptions,
  });
}

export { useKakaoLogin };
