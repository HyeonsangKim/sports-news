// src/components/SocialLoginButton.tsx
import React, { useMemo } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { fp, hp, wp } from '../utils/reponsive';

type SocialLoginType = 'apple' | 'google' | 'kakao' | 'naver';

interface SocialLoginButtonProps {
  type: SocialLoginType;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode; // 아이콘 컴포넌트
}

const SocialLoginButton = ({
  type,
  onPress,
  disabled = false,
  loading = false,
  icon,
}: SocialLoginButtonProps) => {
  // 타입별 스타일 설정
  const buttonConfig = useMemo(() => {
    switch (type) {
      case 'apple':
        return {
          backgroundColor: '#000000',
          textColor: '#FFFFFF',
          text: 'Apple로 계속하기',
          borderColor: '#000000',
        };
      case 'google':
        return {
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          text: 'Google로 계속하기',
          borderColor: '#DADCE0',
        };
      case 'kakao':
        return {
          backgroundColor: '#FEE500',
          textColor: '#000000',
          text: '카카오로 계속하기',
          borderColor: '#FEE500',
        };
      case 'naver':
        return {
          backgroundColor: '#03C75A',
          textColor: '#FFFFFF',
          text: '네이버로 계속하기',
          borderColor: '#03C75A',
        };
      default:
        return {
          backgroundColor: '#000000',
          textColor: '#FFFFFF',
          text: '로그인',
          borderColor: '#000000',
        };
    }
  }, [type]);

  const dynamicButtonStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: buttonConfig.backgroundColor,
      borderColor: buttonConfig.borderColor,
      opacity: disabled ? 0.5 : 1,
    }),
    [buttonConfig, disabled]
  );

  const dynamicTextStyle = useMemo(
    () => ({
      color: buttonConfig.textColor,
    }),
    [buttonConfig]
  );

  return (
    <TouchableOpacity
      style={[styles.button, dynamicButtonStyle]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7} // 눌렀을 때 투명도 70%
    >
      {/* 아이콘 */}
      {!loading && icon && <>{icon}</>}

      {/* 로딩 스피너 */}
      {loading && (
        <ActivityIndicator
          size="small"
          color={buttonConfig.textColor}
          style={styles.loader}
        />
      )}

      {/* 텍스트 */}
      <Text style={[styles.text, dynamicTextStyle]}>{buttonConfig.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: hp(52),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: wp(16),
    marginBottom: hp(12),
    // 그림자 효과 (iOS)
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: wp(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: wp(3),
    // 그림자 효과 (Android)
    elevation: 2,
  },
  text: {
    fontSize: fp(16),
    fontWeight: '600',
    marginLeft: wp(8),
  },
  loader: {
    marginRight: wp(8),
  },
});

export default SocialLoginButton;
