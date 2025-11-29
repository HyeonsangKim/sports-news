// src/screens/auth/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import SocialLoginButton from '../components/SocialLoginButton';
import Apple from '../../assets/icons/apple.svg';
import Google from '../../assets/icons/google.svg';
import Kakao from '../../assets/icons/kakao.svg';
import { fp, hp, wp } from '../utils/reponsive';

const LoginScreen = () => {
  const handleAppleLogin = async () => {
    console.log('Apple 로그인');
    // TODO: Apple 로그인 로직
  };

  const handleGoogleLogin = async () => {
    console.log('Google 로그인');
    // TODO: Google 로그인 로직
  };

  const handleKakaoLogin = async () => {
    console.log('카카오 로그인');
    // TODO: 카카오 로그인 로직
  };

  const handleNaverLogin = async () => {
    console.log('네이버 로그인');
    // TODO: 네이버 로그인 로직
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>
          {/* 로고/타이틀 */}
          <View style={styles.logoContainer}>
            <Text style={styles.title}>로그인</Text>
          </View>

          {/* 소셜 로그인 버튼들 */}
          <View style={styles.socialButtonsContainer}>
            <SocialLoginButton
              type="apple"
              onPress={handleAppleLogin}
              icon={<Apple />}
            />

            <SocialLoginButton
              type="google"
              onPress={handleGoogleLogin}
              icon={<Google />}
            />

            <SocialLoginButton
              type="kakao"
              onPress={handleKakaoLogin}
              icon={<Kakao />}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp(20),
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: fp(32),
    fontWeight: 'bold',
    marginBottom: hp(8),
    textAlign: 'center',
    color: '#000',
  },

  // 소셜 로그인 버튼
  socialButtonsContainer: {
    paddingBottom: hp(50),
  },

  // 카카오 아이콘 (임시)
  kakaoIcon: {
    width: fp(20),
    height: fp(20),
    borderRadius: fp(10),
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kakaoIconText: {
    color: '#FEE500',
    fontSize: fp(14),
    fontWeight: 'bold',
  },

  // 네이버 아이콘 (임시)
  naverIcon: {
    width: fp(20),
    height: fp(20),
    borderRadius: fp(10),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  naverIconText: {
    color: '#03C75A',
    fontSize: fp(14),
    fontWeight: 'bold',
  },

  // 구분선
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(24),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: wp(16),
    fontSize: fp(14),
    color: '#999',
  },

  // 이메일 입력
  input: {
    height: hp(50),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: wp(8),
    paddingHorizontal: wp(16),
    marginBottom: hp(16),
    fontSize: fp(16),
    color: '#000',
  },
});

export default LoginScreen;
