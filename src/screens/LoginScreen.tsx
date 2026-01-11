// src/screens/auth/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import SocialLoginButton from '../components/SocialLoginButton';
import Apple from '../../assets/icons/apple.svg';
import Google from '../../assets/icons/google.svg';
import Kakao from '../../assets/icons/kakao.svg';
import { fp, hp, wp } from '../utils/reponsive';
import SquadRoomIcon from '../../assets/images/squadroom-icon.png';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleAppleLogin = async () => {
    console.log('Apple 로그인');
    // TODO: Apple 로그인 로직
  };

  const handleGoogleLogin = async () => {
    console.log('Google 로그인');
    // TODO: Google 로그인 로직
  };

  const handleKakaoLogin = () => {
    navigation.navigate('KakaoLoginScreen' as never);
  };

  const handleNaverLogin = async () => {
    console.log('네이버 로그인');
    // TODO: 네이버 로그인 로직
  };

  const handleEmailSignup = async () => {
    navigation.navigate('SignupScreen' as never);
  };

  const handleEmailLogin = async () => {
    navigation.navigate('EmailLoginScreen' as never);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>
          {/* 로고/타이틀 */}
          <View style={styles.mainIconContainer}>
            <Image
              source={SquadRoomIcon}
              style={styles.mainIcon}
              resizeMode="contain"
            />
          </View>
          {/* 소셜 로그인 버튼들 */}
          <View style={styles.loginContainer}>
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

            <View style={styles.emailAccountContainer}>
              <TouchableOpacity onPress={handleEmailSignup}>
                <Text>이메일 회원가입</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEmailLogin}>
                <Text>이메일 로그인</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>계정 찾기</Text>
              </TouchableOpacity>
            </View>
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
  mainIconContainer: {
    alignItems: 'center',
    paddingTop: hp(160),
  },
  loginContainer: {
    marginTop: hp(80),
  },
  mainIcon: {
    width: wp(313),
    height: hp(66),
  },
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: wp(20),
  },

  // 소셜 로그인 버튼
  socialButtonsContainer: {
    paddingBottom: hp(0),
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

  emailAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(15),
    paddingHorizontal: wp(20),
  },
});

export default LoginScreen;
