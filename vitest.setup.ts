// vitest.setup.ts
import '@testing-library/jest-native/extend-expect'; // toHaveStyle 같은 매처 추가
import { vi } from 'vitest';

// 1. React Native의 기본 모듈들을 Mocking 합니다.
// (애니메이션, 플랫폼 등 테스트 시 에러를 유발하는 요소들)
vi.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// 2. SVG 파일 Mocking (전역 처리)
// 만약 컴포넌트 내부에서 import ReactComponent from '...svg'를 쓴다면 필수
vi.mock('react-native-svg', () => ({
  default: () => 'SvgMock',
  Svg: () => 'Svg',
  Path: () => 'Path',
}));

// 3. 전역 window 객체 보정 (필요한 경우)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).window = (global as any).window || {};
