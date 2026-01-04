/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  Keyboard,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import client from '../api/client'; // axios 인스턴스
import { fp, hp, wp } from '../utils/reponsive';
import Header from '../components/Header';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const EmailLoginScreen = () => {
  const navigation = useNavigation();

  // 입력값 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 에러 메시지 상태
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 로딩 상태
  const [loading, setLoading] = useState(false);

  // 포커스 제어용 ref (이메일 입력 후 비밀번호로 넘기기 위해)
  const passwordInputRef = useRef<TextInput>(null);

  // 입력 핸들러 (입력 시 에러 메시지 초기화)
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) setPasswordError('');
  };

  // 로그인 요청
  const handleLogin = async () => {
    Keyboard.dismiss(); // 키보드 내리기

    let valid = true;

    // 1. 간단한 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('이메일을 입력해주세요.');
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('이메일 형식이 올바르지 않습니다.');
      valid = false;
    }

    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.');
      valid = false;
    }

    if (!valid) return;

    // 2. 로그인 API 호출
    setLoading(true);
    try {
      // API 응답 구조에 따라 수정 필요 (예: response.data.accessToken)
      const response = await client.post('/auth/login', {
        email,
        password,
      });

      console.log('Login Success:', response.data);

      // TODO: 토큰 저장 로직 (AsyncStorage or SecureStore)
      // await AsyncStorage.setItem('accessToken', response.data.token);

      // 3. 메인 화면으로 이동 (뒤로가기 방지를 위해 reset 사용 권장)
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTab' as never }], // 메인 탭 이름으로 변경하세요
      });
    } catch (error: any) {
      console.error('Login Error:', error);

      // 401 Unauthorized or 404 Not Found
      if (error.response?.status === 401 || error.response?.status === 404) {
        Alert.alert('로그인 실패', '이메일 또는 비밀번호를 확인해주세요.');
      } else {
        Alert.alert(
          '오류',
          '로그인 중 문제가 발생했습니다. 다시 시도해주세요.'
        );
      }
    } finally {
      setLoading(false);
    }
  };
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header isSecond={true} headerText="로그인" action={goBack} />

      <View style={styles.content}>
        <View style={styles.formArea}>
          {/* 이메일 입력 */}
          <Input
            label="이메일"
            placeholder="example@mail.com"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            errorText={emailError}
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()} // 엔터 누르면 비번으로 이동
            blurOnSubmit={false}
          />

          {/* 비밀번호 입력 (눈 아이콘 자동 적용됨) */}
          <Input
            ref={passwordInputRef} // ref 연결
            label="비밀번호"
            placeholder="영문,숫자,특수기호로 8자 이상"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={true}
            errorText={passwordError}
            returnKeyType="done"
            onSubmitEditing={handleLogin} // 엔터 누르면 로그인 실행
          />

          {/* 로그인 버튼 */}
          <Button
            btnText="로그인"
            onPress={handleLogin}
            loading={loading}
            style={{ marginTop: hp(30) }}
          />
        </View>

        {/* 하단 링크 (비밀번호 찾기 | 회원가입) */}
        <View style={styles.footerLinks}>
          <TouchableOpacity
            onPress={() => navigation.navigate('FindPassword' as never)}
          >
            <Text style={styles.linkText}>이메일 회원가입</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            onPress={() => navigation.navigate('Signup' as never)}
          >
            <Text style={styles.linkText}>간편 로그인</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup' as never)}
          >
            <Text style={styles.linkText}>계정 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp(20),
  },
  content: {
    flex: 1,
    justifyContent: 'center', // 화면 중앙 정렬 (Header 제외 영역에서)
    paddingBottom: hp(100), // 시각적 중심을 맞추기 위해 하단 여백 추가
  },
  formArea: {
    width: '100%',
  },
  // 하단 링크 스타일
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(20),
  },
  linkText: {
    color: '#666',
    fontSize: fp(14),
  },
  separator: {
    width: 1,
    height: 12,
    backgroundColor: '#ccc',
    marginHorizontal: 15,
  },
});

export default EmailLoginScreen;
