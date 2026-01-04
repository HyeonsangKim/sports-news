// src/screens/HomeScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  SafeAreaView,
  Text,
} from 'react-native';
import Header from '../components/Header';

// Components
import HomeBanner from '../components/home/HomeBanner';
import SubscribedNews from '../components/home/SubscribedNews';
import HotNews from '../components/home/HotNews';
import RecommendPosts from '../components/home/RecommendPosts';

import { BannerItem, NewsItem, PostItem } from '../types/home';
import {
  MOCK_BANNERS,
  MOCK_HOT_NEWS,
  MOCK_POSTS,
  MOCK_SUBSCRIBED_NEWS,
} from '../api/authMock';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  // 데이터 상태 관리
  const [bannerData, setBannerData] = useState<BannerItem[]>([]);
  const [subscribedData, setSubscribedData] = useState<NewsItem[]>([]);
  const [hotData, setHotData] = useState<NewsItem[]>([]);
  const [postData, setPostData] = useState<PostItem[]>([]);

  // 초기 데이터 로드 (실제로는 API 호출)
  useEffect(() => {
    // API 호출 흉내
    setBannerData(MOCK_BANNERS);
    setSubscribedData(MOCK_SUBSCRIBED_NEWS);
    setHotData(MOCK_HOT_NEWS);
    setPostData(MOCK_POSTS);
  }, []);

  // 새로고침 로직
  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    // 여기서 API 다시 호출하면 됩니다.
    // await fetchAllHomeData();

    setTimeout(() => {
      console.log('새로고침 완료!');
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.safeArea}>
      <Header />

      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {/* 1. 배너 */}
          <HomeBanner data={bannerData} />

          {/* 2. 구분선 (필요하면) */}
          <View style={styles.separator} />

          {/* 3. 구독한 뉴스 */}
          <SubscribedNews data={subscribedData} />

          <View style={styles.separator} />

          {/* 4. 핫한 뉴스 */}
          <HotNews data={hotData} />

          <View style={styles.separator} />

          {/* 5. 추천 게시글 */}
          <RecommendPosts data={postData} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 50,
  },
  separator: {
    height: 10,
    backgroundColor: '#F8F9FA', // 연한 회색 구분선
    marginBottom: 30,
  },
});

export default HomeScreen;
