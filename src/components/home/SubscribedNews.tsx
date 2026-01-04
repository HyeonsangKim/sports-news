// src/components/home/SubscribedNews.tsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NewsItem, SubscribedTab } from '../../types/home';
import { wp, hp, fp } from '../../utils/reponsive';

interface Props {
  data: NewsItem[]; // 전체 뉴스 데이터
}

const TABS: SubscribedTab[] = [
  '호날두',
  '바르셀로나',
  '맨시티',
  '메시',
  '손흥민',
  '라리가',
];

const SubscribedNews = ({ data }: Props) => {
  const [activeTab, setActiveTab] = useState<SubscribedTab>('호날두');

  // 선택된 탭에 맞는 뉴스만 필터링 (최적화)
  const filteredNews = useMemo(() => {
    return data.filter((item) => item.category === activeTab);
  }, [data, activeTab]);

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>구독한 뉴스</Text>
        <TouchableOpacity>
          <Text style={styles.moreText}>더보기</Text>
        </TouchableOpacity>
      </View>

      {/* 탭 리스트 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScroll}
        contentContainerStyle={{ paddingRight: wp(20) }}
      >
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 뉴스 리스트 (map 사용) */}
      <View style={styles.listContainer}>
        {filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <TouchableOpacity key={item.id} style={styles.listItem}>
              <Text style={styles.newsTitle} numberOfLines={1}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>관련 뉴스가 없습니다.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: hp(30) },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(20),
    marginBottom: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  moreText: { color: '#999', fontSize: fp(13) },

  tabScroll: { paddingLeft: wp(20), marginBottom: 15 },
  tabItem: { marginRight: 20, paddingBottom: 8 },
  activeTabItem: { borderBottomWidth: 2, borderBottomColor: '#000' },
  tabText: { fontSize: fp(15), color: '#999', fontWeight: '500' },
  activeTabText: { color: '#000', fontWeight: 'bold' },

  listContainer: { paddingHorizontal: wp(20) },
  listItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  newsTitle: { fontSize: fp(15), color: '#333' },
  emptyContainer: { paddingVertical: 20, alignItems: 'center' },
  emptyText: { color: '#999' },
});

export default SubscribedNews;
