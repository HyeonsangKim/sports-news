import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { authApi } from '../api/authMock';
import client from '../api/client';
import { fp, hp, wp } from '../utils/reponsive';
import Header from '../components/Header';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const SignupScreen = () => {
  const navigation = useNavigation();

  const [step, setStep] = useState<1 | 2>(1);
  const [isEmailSent, setIsEmailSent] = useState(false);

  // 입력값 상태
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [password, setPassword] = useState('');

  // 에러 메시지 상태 (이메일 & 인증번호)
  const [emailError, setEmailError] = useState('');
  const [authCodeError, setAuthCodeError] = useState(''); // [NEW] 인증번호 에러 상태 추가

  const [loading, setLoading] = useState(false);

  // 이메일 입력 핸들러
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) setEmailError('');
  };

  // [NEW] 인증번호 입력 핸들러 (입력 시 에러 초기화)
  const handleAuthCodeChange = (text: string) => {
    setAuthCode(text);
    if (authCodeError) setAuthCodeError('');
  };

  const validateEmail = (emailAddr: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailAddr);
  };

  // 1. [인증번호 받기]
  const handleRequestEmail = async () => {
    if (!email) return setEmailError('이메일을 입력해주세요.');
    if (!validateEmail(email))
      return setEmailError('올바른 이메일 형식이 아닙니다.');

    setLoading(true);
    setEmailError('');

    try {
      await authApi.checkEmail(email);
      Alert.alert('인증번호 발송', '메일로 인증번호를 보냈습니다.');
      setIsEmailSent(true);
    } catch (error: any) {
      if (error.response?.status === 409) {
        setEmailError('이미 가입된 이메일입니다.');
      } else {
        Alert.alert('오류', '이메일 확인 중 문제가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 2. [인증번호 확인] -> 여기가 핵심 수정 부분
  const handleVerifyCode = async () => {
    // 길이 체크
    if (authCode.length !== 6) {
      setAuthCodeError('인증번호 6자리를 입력해주세요.'); // Alert 대신 에러 텍스트 설정
      return;
    }

    setLoading(true);
    setAuthCodeError(''); // 요청 전 에러 초기화

    try {
      // TODO: 실제 API 호출 (예: await authApi.verifyCode(email, authCode);)

      // [시뮬레이션] 만약 인증번호가 '123456'이 아니면 에러를 띄워봄 (테스트용 로직)
      // 실제로는 API 호출 실패 시 catch 블록으로 빠지게 됩니다.
      /* if (authCode !== '123456') {
        throw new Error('Invalid code');
      } 
      */

      Alert.alert('인증 성공', '비밀번호를 설정해주세요.');
      setStep(2);
    } catch (error) {
      // API 검증 실패 시 에러 메시지 표시
      setAuthCodeError('인증번호가 일치하지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 3. [회원가입 완료]
  const handleCompleteSignup = async () => {
    if (!password) {
      Alert.alert('알림', '비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      await client.post('/auth/register', {
        email,
        code: authCode,
        password,
      });
      Alert.alert('가입 성공', '로그인 해주세요.', [
        { text: '확인', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('가입 실패', '잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const renderButton = () => {
    if (step === 2) {
      return (
        <Button
          btnText="회원가입 완료"
          onPress={handleCompleteSignup}
          loading={loading}
          style={{ marginTop: hp(20) }}
        />
      );
    }

    if (!isEmailSent) {
      return (
        <Button
          btnText="인증번호 받기"
          onPress={handleRequestEmail}
          loading={loading}
          style={{ marginTop: hp(20) }}
        />
      );
    }

    return (
      <View>
        <Button
          btnText="인증번호 확인"
          onPress={handleVerifyCode}
          loading={loading}
          style={{ marginTop: hp(20) }}
        />
        <Button
          btnText="인증번호가 오지 않나요? 재전송"
          onPress={handleRequestEmail}
          style={styles.resendButton}
          textStyle={styles.resendText}
          disabled={loading}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header isSecond={true} headerText="이메일로 가입하기" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Input
          label="이메일 주소"
          placeholder="example@mail.com"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          errorText={emailError}
          editable={!isEmailSent}
        />

        {/* 인증번호 입력 인풋 수정됨 */}
        {isEmailSent && step === 1 && (
          <Input
            label="인증번호 6자리 입력"
            placeholder="123456"
            value={authCode}
            onChangeText={handleAuthCodeChange} // [수정] 핸들러 교체
            keyboardType="number-pad"
            maxLength={6}
            containerStyle={{ marginTop: 10 }}
            errorText={authCodeError} // [NEW] 에러 메시지 전달
          />
        )}

        {step === 2 && (
          <Input
            label="비밀번호 설정"
            placeholder="비밀번호"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        )}

        {renderButton()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(20),
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: hp(50),
    paddingTop: hp(40),
  },
  resendButton: {
    backgroundColor: 'transparent',
    marginTop: hp(5),
    padding: 10,
  },
  resendText: {
    color: '#888',
    fontSize: fp(13),
    textDecorationLine: 'underline',
    fontWeight: 'normal',
  },
});

export default SignupScreen;
