import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native'; // 아이콘 임포트
import { fp, hp, wp } from '../../utils/reponsive';

interface InputProps extends TextInputProps {
  label?: string;
  errorText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export default function Input({
  label,
  errorText,
  containerStyle,
  inputStyle,
  labelStyle,
  editable = true,
  secureTextEntry = false, // 기본값 false, true가 들어오면 비밀번호 모드 작동
  ...rest
}: InputProps) {
  // 비밀번호 가리기/보이기 내부 상태
  // secureTextEntry가 true로 들어왔을 때만 의미가 있음
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 실제 인풋에 적용될 secure 속성
  // (원래 secure여야 하고 + 현재 가리기 상태일 때만 true)
  const isSecureActive = secureTextEntry && !isPasswordVisible;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            !editable && styles.disabledInput,
            errorText ? styles.errorInput : null,
            // 비밀번호 모드일 때 오른쪽 패딩을 더 줘서 아이콘과 겹치지 않게 함
            secureTextEntry ? { paddingRight: 50 } : null,
            inputStyle,
          ]}
          placeholderTextColor="#999"
          autoCapitalize="none"
          editable={editable}
          selectTextOnFocus={editable}
          // 여기서 계산된 secure 값을 넣어줌
          secureTextEntry={isSecureActive}
          {...rest}
        />

        {/* secureTextEntry가 true인 경우에만 눈 아이콘 표시 */}
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // 터치 영역 확장
          >
            {isPasswordVisible ? (
              // 내용이 보일 때: 빗금 쳐진 눈 (검은색)
              <EyeOff color="#000" size={24} />
            ) : (
              // 내용이 가려질 때: 그냥 눈 (회색)
              <Eye color="#999" size={24} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: hp(15) },
  label: {
    fontSize: fp(16),
    fontWeight: 'bold',
    marginBottom: hp(8),
    color: '#333',
  },
  // 아이콘 위치를 잡기 위해 Wrapper 추가 (TextInput + Icon)
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    fontSize: fp(16),
    backgroundColor: '#fff',
    color: '#000',
    width: '100%',
  },
  disabledInput: {
    backgroundColor: '#F5F5F5',
    color: '#999',
    borderColor: '#E0E0E0',
  },
  errorInput: { borderColor: '#FF3B30' },
  errorText: {
    color: '#FF3B30',
    fontSize: fp(12),
    marginTop: hp(4),
    marginLeft: wp(4),
  },
  // 눈 아이콘 스타일 (절대 위치로 인풋창 오른쪽에 고정)
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
});
