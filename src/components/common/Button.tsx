/* components/atoms/Button.tsx */
import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator, // 스피너 컴포넌트
} from 'react-native';
import { throttle } from 'lodash';
import { fp, hp, wp } from '../../utils/reponsive';

interface ButtonProps {
  btnText: string;
  labelText?: string;
  disabled?: boolean;
  loading?: boolean; // 로딩 상태 추가
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  throttleTime?: number;
}

export default function Button({
  labelText,
  disabled = false,
  loading = false, // 기본값 false
  btnText,
  onPress,
  style,
  textStyle,
  throttleTime = 1000,
}: ButtonProps) {
  const handlePress = useMemo(
    () =>
      throttle(
        () => {
          // 로딩 중이거나 비활성화 상태면 실행 안 함
          if (!loading && !disabled && onPress) onPress();
        },
        throttleTime,
        { leading: true, trailing: false }
      ),
    [onPress, throttleTime, loading, disabled]
  );

  return (
    <View style={styles.container}>
      {labelText && <Text style={styles.label}>{labelText}</Text>}

      <TouchableOpacity
        style={[
          styles.button,
          // 비활성화되거나 로딩 중이면 회색 처리
          disabled || loading ? styles.disabledButton : styles.activeButton,
          style,
        ]}
        onPress={handlePress}
        // 로딩 중이거나 비활성화면 터치 막기
        disabled={disabled || loading}
        activeOpacity={0.7}
      >
        {loading ? (
          // 로딩 중이면 스피너 표시
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text
            style={[
              styles.text,
              disabled || loading ? styles.disabledText : styles.activeText,
              textStyle,
            ]}
          >
            {btnText}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: hp(10) },
  label: {
    fontSize: fp(14),
    marginBottom: hp(8),
    color: '#333',
    fontWeight: '600',
  },
  button: {
    paddingHorizontal: wp(15),
    paddingVertical: hp(15),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: hp(50), // 스피너 돌 때 높이 유지
  },
  activeButton: { backgroundColor: '#000000' },
  disabledButton: { backgroundColor: '#A1A1A1' },
  text: { fontSize: fp(16), fontWeight: 'bold' },
  activeText: { color: '#FFFFFF' },
  disabledText: { color: '#F0F0F0' },
});
