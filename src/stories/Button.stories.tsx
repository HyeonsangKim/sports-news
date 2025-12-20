import React from 'react';
import { View } from 'react-native';
import { Meta, StoryObj } from '@storybook/react-native';
import Button from '../components/common/Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    onPress: { action: 'pressed' }, // 스토리북 액션 탭에서 클릭 확인 가능
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    btnText: '기본 버튼',
  },
};

export const WithLabel: Story = {
  args: {
    labelText: '라벨이 있는 버튼',
    btnText: '눌러보세요',
  },
};

export const Loading: Story = {
  args: {
    btnText: '로딩 중...',
    loading: true, // 이 값을 true로 주면 스피너가 돕니다
  },
};

// 기존 Disabled 스토리도 loading과 구분되게 유지
export const Disabled: Story = {
  args: {
    btnText: '클릭 불가',
    disabled: true,
    loading: false,
  },
};

export const CustomStyle: Story = {
  args: {
    btnText: '커스텀 스타일',
    style: { backgroundColor: 'purple', borderRadius: 20 },
    textStyle: { color: 'yellow' },
  },
};
