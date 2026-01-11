import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView, { WebViewNavigation } from 'react-native-webview';
import Config from 'react-native-config';
import axios from 'axios';
import { useKakaoLogin } from '../../hooks/queries/useAuth';

// TODO: 리다이렉트 URI 배포시 서버주소 추가하기 (카카오 디벨로퍼에서 설정 필요)
const REDIRECT_URI = `http://localhost:3030/auth/kakao`;

const KakaoLoginScreen = () => {
  const { mutate: kakaoLogin } = useKakaoLogin();
  const [isLoading, setIsLoading] = useState(false);

  const requestToken = async (code: string) => {
    const response = await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: Config.KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      },
    });

    // console.log('code', code);
    // console.log('response', response);
    kakaoLogin(response.data.access_token);
  };

  const handleShouldStartLoadWithRequest = (event: WebViewNavigation) => {
    const isMatched = event.url.includes(`${REDIRECT_URI}?code=`);

    if (isMatched) {
      const code = event.url.replace(`${REDIRECT_URI}?code=`, '');
      requestToken(code);
      setIsLoading(event.loading);
      return false;
    }

    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <ActivityIndicator size="large" color="#000" />}
      <WebView
        style={styles.container}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default KakaoLoginScreen;
