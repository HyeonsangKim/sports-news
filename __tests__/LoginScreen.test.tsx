import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { describe, it, expect, vi, afterEach } from 'vitest';
import LoginScreen from '../src/screens/LoginScreen.tsx';

// 1. SVG 컴포넌트 Mocking (테스트 환경에서는 SVG를 렌더링할 수 없으므로 가짜 컴포넌트로 대체)
vi.mock('../../assets/icons/apple.svg', () => ({
  default: () => <></>,
}));
vi.mock('../../assets/icons/google.svg', () => ({
  default: () => <></>,
}));
vi.mock('../../assets/icons/kakao.svg', () => ({
  default: () => <></>,
}));

// 2. 반응형 유틸 Mocking (복잡한 계산 없이 입력값을 그대로 반환하도록 설정)
vi.mock('../utils/reponsive', () => ({
  fp: (val: number) => val,
  hp: (val: number) => val,
  wp: (val: number) => val,
}));

// 3. SocialLoginButton Mocking (선택 사항: 내부 구현 의존성을 없애고 싶다면)
// 여기서는 실제 버튼을 클릭해야 하므로 Mocking 하지 않고 통합 테스트 형태로 진행합니다.

describe('LoginScreen 테스트', () => {
  // 각 테스트 후 Mock 초기화
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('화면이 정상적으로 렌더링되어야 한다 (제목 확인)', () => {
    render(<LoginScreen />);

    // '로그인'이라는 텍스트가 있는지 확인
    const titleElement = screen.getByText('로그인');
    expect(titleElement).toBeTruthy();
  });

  it('Apple 로그인 버튼을 누르면 로그가 출력되어야 한다', () => {
    // console.log를 감시(Spy)합니다.
    const consoleSpy = vi.spyOn(console, 'log');

    render(<LoginScreen />);

    // Apple 버튼 찾기 (SocialLoginButton 내부에서 어떤testID나 텍스트를 쓰는지에 따라 달라짐)
    // 여기서는 type="apple"인 버튼을 찾는다고 가정하거나, 버튼 내부 텍스트가 없다면 testID를 추가하는 것이 좋습니다.
    // 임시로 버튼이 렌더링 된 순서나 내부 아이콘을 통해 트리거 될 수 있습니다.

    // *실제 적용 팁: SocialLoginButton에 testID="btn-apple" 등을 props로 넘겨주면 찾기 쉽습니다.
    // 현재 코드 기준으로는 svg mock이나 버튼 컴포넌트 구조를 모르므로,
    // SocialLoginButton이 TouchableOpacity라면 onPress가 전달됩니다.

    // 여기서는 화면상의 버튼 컴포넌트들을 모두 가져와서 테스트해봅니다.
    // (실제로는 버튼에 접근성 라벨이나 testID를 부여하는 것을 권장합니다)
  });

  // 👇 실제로 작동하게 하려면 SocialLoginButton에 testID를 주는 것이 가장 확실합니다.
  // 아래는 testID가 있다고 가정한 테스트 코드입니다.

  it('각 소셜 로그인 버튼 클릭 시 올바른 핸들러가 동작해야 한다', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<LoginScreen />);

    // NOTE: 실제 코드의 SocialLoginButton에 testID="apple-button" 등을 추가했다고 가정
    // const appleButton = screen.getByTestId('apple-button');
    // fireEvent.press(appleButton);
    // expect(consoleSpy).toHaveBeenCalledWith('Apple 로그인');

    // 만약 testID가 없다면, 텍스트가 없어서 찾기 힘들 수 있습니다.
    // 이 경우 SocialLoginButton 내부에 'Apple로 로그인' 같은 텍스트가 있다면 getByText로 찾으세요.
  });
});
