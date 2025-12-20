import React from 'react';
import { View } from 'react-native';
import { Meta, StoryObj } from '@storybook/react-native';
import Input from '../components/common/Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  decorators: [
    (Story) => (
      <View
        style={{
          padding: 20,
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 인풋
export const Basic: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@email.com',
  },
};

// [NEW] 비밀번호 입력 인풋 (눈 아이콘 테스트용)
export const Password: Story = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    secureTextEntry: true, // 이 값을 주면 눈 아이콘이 생깁니다.
    value: 'mySecretPassword123', // 테스트 값
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    label: '이메일 주소 (전송 완료)',
    value: 'user@example.com',
    editable: false,
  },
};

// 인증번호 입력 예시
export const AuthCode: Story = {
  args: {
    label: '인증번호 6자리 입력',
    placeholder: '123456',
    keyboardType: 'number-pad',
    maxLength: 6,
  },
};

// 에러 상태
export const WithError: Story = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호 입력',
    secureTextEntry: true,
    errorText: '비밀번호가 일치하지 않습니다.',
    value: 'wrong_password',
  },
};
