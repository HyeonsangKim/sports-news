// src/types/home.ts

export interface BannerItem {
  id: number;
  imageUrl: string;
  title: string;
}

export interface NewsItem {
  id: number;
  category?: string; // 탭 필터링용 (예: '호날두', '손흥민')
  title: string;
  thumbnail?: string; // 핫한 뉴스 썸네일용
  date?: string;
}

export interface PostItem {
  id: number;
  title: string;
  authorTeam: string; // 작성자 팀 (회색 텍스트)
  commentCount: number;
}

// 구독한 뉴스 탭 목록 타입
export type SubscribedTab =
  | '호날두'
  | '바르셀로나'
  | '맨시티'
  | '메시'
  | '손흥민'
  | '라리가';
