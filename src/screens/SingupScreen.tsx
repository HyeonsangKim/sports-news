/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Check } from 'lucide-react-native';
import { fp, hp, wp } from '../utils/reponsive';
import Header from '../components/Header';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { validateEmail } from '../utils/func';
import { authApi } from '../api/auth';
import SignupSuccess from '../components/SignupSuccess';
import { useAuthStore } from '../store/authStore';

// [NEW] 비밀번호 조건 체크용 컴포넌트 (내부 사용)
const PasswordRequirement = ({
  label,
  isValid,
}: {
  label: string;
  isValid: boolean;
}) => (
  <View style={styles.reqRow}>
    <View style={{ width: 20, alignItems: 'center' }}>
      {isValid && <Check size={16} color="#000" />}
    </View>
    <Text style={[styles.reqText, isValid && styles.reqTextValid]}>
      {label}
    </Text>
  </View>
);

const SignupScreen = () => {
  const navigation = useNavigation();
  const setTokens = useAuthStore((state) => state.setTokens);

  const [step, setStep] = useState<1 | 2 | 3 | 'success'>(1);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- Step 1 States ---
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [authCodeError, setAuthCodeError] = useState('');

  // --- Step 2 States ---
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmError, setConfirmError] = useState('');

  // --- Step 3 States (약관 동의) ---
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  // [NEW] 비밀번호 유효성 검사 상태 (실시간 계산)
  const isLengthValid = password.length >= 8;
  const isComplexityValid =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(password);

  // 전체 비밀번호 유효성
  const isPasswordValid = isLengthValid && isComplexityValid;

  // 비밀번호 일치 여부 (둘 다 값이 있을 때만 체크)
  const isMatch = password && confirmPassword && password === confirmPassword;

  // Step 1 로직 (생략 없이 유지)
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) setEmailError('');
  };
  const handleAuthCodeChange = (text: string) => {
    setAuthCode(text);
    if (authCodeError) setAuthCodeError('');
  };
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
      console.log(error);

      if (error.response?.status === 409)
        setEmailError('이미 가입된 이메일입니다.');
      else Alert.alert('오류', '이메일 확인 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (authCode.length !== 6) {
      setAuthCodeError('인증번호 6자리를 입력해주세요.');
      return;
    }
    setLoading(true);
    setAuthCodeError('');
    try {
      const response = await authApi.verifyCode(email, authCode);
      console.log(response);

      // success가 true이고 verified가 true인 경우에만 step2로 이동
      if (response.success && response.data.verified) {
        setStep(2);
      } else {
        // success는 true인데 verified가 false인 경우
        setAuthCodeError('인증번호가 틀렸습니다.');
      }
    } catch (error) {
      // API 요청 자체가 실패한 경우
      setAuthCodeError('인증번호가 틀렸습니다.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2 완료 - Step 3로 이동
  const handlePasswordComplete = () => {
    if (!isPasswordValid) {
      Alert.alert('알림', '비밀번호 조건을 만족해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      setConfirmError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setStep(3);
  };

  // Step 3 - 회원가입 완료
  const handleCompleteSignup = async () => {
    if (!termsAgreed || !privacyAgreed) {
      Alert.alert('알림', '약관에 모두 동의해주세요.');
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.register({
        email,
        password,
        termsAgreed,
        privacyAgreed,
      });

      if (response.success) {
        // 토큰 저장
        setTokens(response.data.accessToken, response.data.refreshToken);
        // 성공 화면 표시
        setStep('success');
        // 3초 후 홈으로 이동
        setTimeout(() => {
          navigation.navigate('Home' as never);
        }, 3000);
      } else {
        Alert.alert('가입 실패', response.message);
      }
    } catch (error: any) {
      Alert.alert(
        '가입 실패',
        error.response?.data?.message || '잠시 후 다시 시도해주세요.'
      );
    } finally {
      setLoading(false);
    }
  };

  // 비밀번호 확인 입력 시 에러 초기화
  const handleConfirmChange = (text: string) => {
    setConfirmPassword(text);
    if (confirmError) setConfirmError('');
  };

  const renderButton = () => {
    if (step === 3) {
      return (
        <Button
          btnText="약관 전체 동의 및 회원가입 완료"
          onPress={handleCompleteSignup}
          loading={loading}
          style={{ marginTop: hp(20) }}
        />
      );
    }
    if (step === 2) {
      return (
        <Button
          btnText="다음"
          onPress={handlePasswordComplete}
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

  const goBack = () => {
    navigation.goBack();
  };

  // 전체 동의 토글
  const toggleAllAgreements = () => {
    const newValue = !(termsAgreed && privacyAgreed);
    setTermsAgreed(newValue);
    setPrivacyAgreed(newValue);
  };

  // 성공 화면
  if (step === 'success') {
    return <SignupSuccess />;
  }

  return (
    <View style={styles.container}>
      <Header isSecond={true} headerText="이메일로 가입하기" action={goBack} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Step 1 영역 */}
        {step === 1 && (
          <>
            <Input
              label="이메일 주소"
              placeholder="example@mail.com"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              errorText={emailError}
              editable={!isEmailSent}
            />
            {isEmailSent && (
              <Input
                label="인증번호"
                placeholder="인증번호 6자리를 입력해주세요"
                value={authCode}
                onChangeText={handleAuthCodeChange}
                keyboardType="number-pad"
                maxLength={6}
                containerStyle={{ marginTop: 10 }}
                errorText={authCodeError}
              />
            )}
          </>
        )}

        {/* Step 2 영역 (비밀번호 설정) */}
        {step === 2 && (
          <View>
            {/* 1. 비밀번호 입력 */}
            <Input
              label="비밀번호 설정"
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              // 유효하지 않고 값이 있을 때 테두리를 빨갛게 할지,
              // 아니면 아래 조건 리스트로 퉁칠지는 기획에 따라 다름.
              // 여기선 조건 리스트가 있으니 인풋 자체 에러는 뺌.
            />

            {/* [NEW] 비밀번호 조건 리스트 */}
            <View style={styles.reqContainer}>
              <PasswordRequirement
                label="8자리 이상 입력"
                isValid={isLengthValid}
              />
              <PasswordRequirement
                label="영문, 숫자, 특수문자 포함"
                isValid={isComplexityValid}
              />
            </View>

            {/* 2. 비밀번호 확인 입력 */}
            <Input
              label="비밀번호 확인"
              placeholder="비밀번호를 한 번 더 입력해주세요"
              secureTextEntry
              value={confirmPassword}
              onChangeText={handleConfirmChange}
              errorText={confirmError} // "비밀번호가 일치하지 않습니다" (빨간색)
              containerStyle={{ marginTop: 20 }}
            />

            {/* [NEW] 일치 성공 메시지 (파란색) */}
            {/* 에러가 없고, 입력값이 있고, 일치할 때만 보임 */}
            {!confirmError && isMatch && (
              <View style={styles.matchContainer}>
                <Check size={16} color="#000000" />
                <Text style={styles.matchText}>비밀번호가 일치합니다.</Text>
              </View>
            )}
          </View>
        )}

        {/* Step 3 영역 (약관 동의) */}
        {step === 3 && (
          <View>
            <Text style={styles.termsTitle}>약관 동의</Text>

            {/* 전체 동의 */}
            <TouchableOpacity
              style={styles.allAgreeContainer}
              onPress={toggleAllAgreements}
            >
              <View style={styles.checkboxContainer}>
                <View
                  style={[
                    styles.checkbox,
                    termsAgreed && privacyAgreed && styles.checkboxChecked,
                  ]}
                >
                  {termsAgreed && privacyAgreed && (
                    <Check size={18} color="#fff" strokeWidth={3} />
                  )}
                </View>
                <Text style={styles.allAgreeText}>전체 동의</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* 이용약관 동의 */}
            <TouchableOpacity
              style={styles.agreeItem}
              onPress={() => setTermsAgreed(!termsAgreed)}
            >
              <View style={styles.checkboxContainer}>
                <View
                  style={[
                    styles.checkbox,
                    termsAgreed && styles.checkboxChecked,
                  ]}
                >
                  {termsAgreed && (
                    <Check size={18} color="#fff" strokeWidth={3} />
                  )}
                </View>
                <Text style={styles.agreeText}>(필수) 이용약관 동의</Text>
              </View>
              <Text style={styles.viewText}>보기</Text>
            </TouchableOpacity>

            {/* 개인정보 처리방침 동의 */}
            <TouchableOpacity
              style={styles.agreeItem}
              onPress={() => setPrivacyAgreed(!privacyAgreed)}
            >
              <View style={styles.checkboxContainer}>
                <View
                  style={[
                    styles.checkbox,
                    privacyAgreed && styles.checkboxChecked,
                  ]}
                >
                  {privacyAgreed && (
                    <Check size={18} color="#fff" strokeWidth={3} />
                  )}
                </View>
                <Text style={styles.agreeText}>
                  (필수) 개인정보 처리방침 동의
                </Text>
              </View>
              <Text style={styles.viewText}>보기</Text>
            </TouchableOpacity>
          </View>
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
  // --- 비밀번호 조건 스타일 ---
  reqContainer: {
    marginTop: -5, // 인풋과의 간격 조절
    marginBottom: 5,
    paddingLeft: 5,
  },
  reqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reqText: {
    fontSize: fp(13),
    color: '#999', // 기본 회색
    marginLeft: 5,
  },
  reqTextValid: {
    color: '#000', // 충족 시 검은색
    fontWeight: '500',
  },
  // --- 비밀번호 일치 성공 스타일 ---
  matchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10, // 인풋 바로 아래 붙이기 위해
    marginBottom: 10,
    marginLeft: 5,
  },
  matchText: {
    color: '#000000',
    fontSize: fp(13),
    marginLeft: 5,
  },
  // --- Step 3 약관 동의 스타일 ---
  termsTitle: {
    fontSize: fp(18),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: hp(20),
  },
  allAgreeContainer: {
    padding: hp(16),
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: hp(10),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  allAgreeText: {
    fontSize: fp(16),
    fontWeight: 'bold',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: hp(15),
  },
  agreeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(12),
  },
  agreeText: {
    fontSize: fp(14),
    color: '#333',
  },
  viewText: {
    fontSize: fp(13),
    color: '#888',
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;
