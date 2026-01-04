/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/authMock.ts

import { BannerItem, NewsItem, PostItem } from '../types/home';

// 딜레이를 줘서 실제 네트워크처럼 느끼게 함 (0.5초)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
  // 이메일 중복 확인 Mock
  checkEmail: async (email: string) => {
    await delay(500);
    if (email === 'duplicate@test.com') {
      // 409 에러 흉내
      return Promise.reject({ response: { status: 409 } });
    }
    return { status: 200, message: '사용 가능' };
  },

  // 로그인 Mock
  login: async (email: string, pass: string) => {
    await delay(500);
    if (email === 'test@test.com' && pass === '1234') {
      return {
        data: {
          accessToken: 'mock_access_token_' + Date.now(),
          refreshToken: 'mock_refresh_token_' + Date.now(),
          user: {
            id: '1',
            email: email,
            name: '테스트유저',
            provider: 'email',
          },
        },
      };
    }
    throw new Error('로그인 실패');
  },

  // 회원가입 Mock
  register: async (data: any) => {
    await delay(800);
    return { status: 200, message: '가입 성공' };
  },
};

export const MOCK_BANNERS: BannerItem[] = [
  {
    id: 1,
    title: '텐하흐, 공식전 3경기만에 경질... 충격의 현장',
    imageUrl:
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070&auto=format&fit=crop', // 축구 관련 더미 이미지
  },
  {
    id: 2,
    title: '김민재, 바이에른 뮌헨 철벽 수비 과시 "괴물 그 자체"',
    imageUrl:
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    title: '김민재, 바이에른 뮌헨 철벽 수비 과시 "괴물 그 자체"',
    imageUrl:
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070&auto=format&fit=crop',
  },
];

// 탭 필터링 테스트를 위해 category를 다양하게 넣었습니다.
export const MOCK_SUBSCRIBED_NEWS: NewsItem[] = [
  { id: 1, category: '호날두', title: '호날두, 사우디 리그 해트트릭 달성' },
  {
    id: 2,
    category: '호날두',
    title: '호날두 "나는 아직 배고프다" 인터뷰 화제',
  },
  {
    id: 3,
    category: '바르셀로나',
    title: '바르셀로나, 재정 문제 해결되나? 라포르타 회장 언급',
  },
  { id: 4, category: '맨시티', title: '맨시티, 펩 과르디올라 재계약 임박' },
  { id: 5, category: '손흥민', title: '손흥민이 골 넣었대요' },
  { id: 6, category: '손흥민', title: '손흥민, 토트넘 주장으로서의 품격' },
  { id: 7, category: '호날두', title: '호날두, 은퇴설 일축 "40세까지 뛴다"' },
  { id: 8, category: '메시', title: '메시, 미국 리그 정복 완료' },
];

export const MOCK_HOT_NEWS: NewsItem[] = [
  {
    id: 1,
    title: '이강인, PSG 주전 경쟁 청신호... 엔리케 감독 극찬',
    thumbnail:
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000',
  },
  {
    id: 2,
    title: 'PL 우승 경쟁 점입가경, 아스날 vs 맨시티',
    thumbnail:
      'https://images.unsplash.com/photo-1579952363873-27f3bde9be2b?q=80&w=1000',
  },
  { id: 3, title: '손흥민이 골 넣었대요' },
  { id: 4, title: '아스날 해체 위기? 루머 확산' },
  { id: 5, title: '월드컵, 한국 예선 탈락 위기... 클린스만 경질론' },
];

export const MOCK_POSTS: PostItem[] = [
  {
    id: 1,
    title: '손흥민이 골 넣었어요 대박',
    authorTeam: 'LA FC',
    commentCount: 12,
  },
  {
    id: 2,
    title: '오늘 뮌헨 경기 보신 분?',
    authorTeam: 'PSG',
    commentCount: 5,
  },
  {
    id: 3,
    title: 'ㅋㅋ 레알 마드리드 폼 미쳤다',
    authorTeam: '레알 마드리드',
    commentCount: 23,
  },
  {
    id: 4,
    title: '제목이 너무 길어지면 이렇게 됩니다 제목이 너무 길어지면 이렇게',
    authorTeam: '전북 현대',
    commentCount: 2,
  },
  {
    id: 5,
    title: 'K리그 직관 가보려는데 추천좀요',
    authorTeam: '바르셀로나',
    commentCount: 8,
  },
];
