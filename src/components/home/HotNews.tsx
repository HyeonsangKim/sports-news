// src/components/home/HotNews.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NewsItem } from '../../types/home';
import { wp, hp, fp } from '../../utils/reponsive';

interface Props {
  data: NewsItem[];
}

const HotNews = ({ data }: Props) => {
  // 상위 2개 (썸네일용)
  const topNews = data.slice(0, 2);
  // 나머지 (리스트용)
  const listNews = data.slice(2);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>지금 핫한 뉴스</Text>

      {/* 상단 2개 그리드 */}
      <View style={styles.gridContainer}>
        {topNews.map((item) => (
          <TouchableOpacity key={item.id} style={styles.gridItem}>
            <View style={styles.thumbnailBox}>
              {item.thumbnail ? (
                <Image
                  source={{ uri: item.thumbnail }}
                  style={styles.thumbnail}
                />
              ) : (
                <View
                  style={[styles.thumbnail, { backgroundColor: '#FF6B6B' }]}
                />
              )}
            </View>
            <Text style={styles.gridTitle} numberOfLines={2}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 하단 리스트 */}
      <View style={styles.listContainer}>
        {listNews.map((item) => (
          <TouchableOpacity key={item.id} style={styles.listItem}>
            <Text style={styles.newsTitle} numberOfLines={1}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: hp(30), paddingHorizontal: wp(20) },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },

  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  gridItem: { width: '48%' },
  thumbnailBox: {
    width: '100%',
    height: hp(120),
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  thumbnail: { width: '100%', height: '100%' },
  gridTitle: {
    fontSize: fp(14),
    fontWeight: '600',
    color: '#333',
    lineHeight: 20,
  },

  listContainer: { marginTop: 5 },
  listItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  newsTitle: { fontSize: fp(15), color: '#333' },
});

export default HotNews;
