// src/components/home/RecommendPosts.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PostItem } from '../../types/home';
import { wp, hp, fp } from '../../utils/reponsive';

interface Props {
  data: PostItem[];
}

const RecommendPosts = ({ data }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>추천 게시글</Text>

      <View>
        {data.map((item) => (
          <TouchableOpacity key={item.id} style={styles.postItem}>
            {/* 제목 */}
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            {/* 팀 이름 (태그) */}
            <Text style={styles.teamName}>{item.authorTeam}</Text>
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
    marginBottom: 10,
    color: '#000',
  },

  postItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    flex: 1,
    fontSize: fp(15),
    color: '#333',
    marginRight: 10,
  },
  teamName: {
    fontSize: fp(12),
    color: '#999',
    fontWeight: '500',
  },
});

export default RecommendPosts;
