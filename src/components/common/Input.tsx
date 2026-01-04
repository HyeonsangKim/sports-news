import React, { useState, forwardRef } from 'react';
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
import { Eye, EyeOff } from 'lucide-react-native';
import { fp } from '../../utils/reponsive';

interface InputProps extends TextInputProps {
  label?: string;
  errorText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

// forwardRef<Ref타입, Props타입>
const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      errorText,
      containerStyle,
      inputStyle,
      labelStyle,
      editable = true,
      secureTextEntry = false,
      ...rest
    },
    ref // 부모(LoginScreen)에서 보낸 ref를 여기서 받음
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // secureTextEntry가 true일 때만 로직 적용
    const isSecureActive = secureTextEntry && !isPasswordVisible;

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

        <View style={styles.inputWrapper}>
          <TextInput
            ref={ref} // 받은 ref를 진짜 TextInput에 연결!
            style={[
              styles.input,
              !editable && styles.disabledInput,
              errorText ? styles.errorInput : null,
              secureTextEntry ? { paddingRight: 50 } : null,
              inputStyle,
            ]}
            placeholderTextColor="#999"
            autoCapitalize="none"
            editable={editable}
            selectTextOnFocus={editable}
            secureTextEntry={isSecureActive}
            {...rest}
          />

          {secureTextEntry && (
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={togglePasswordVisibility}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {isPasswordVisible ? (
                <EyeOff color="#000" size={24} />
              ) : (
                <Eye color="#999" size={24} />
              )}
            </TouchableOpacity>
          )}
        </View>

        {errorText && <Text style={styles.errorText}>{errorText}</Text>}
      </View>
    );
  }
);

export default Input;

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
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
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
});
