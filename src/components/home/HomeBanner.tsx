// src/components/home/HomeBanner.tsx
import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { BannerItem } from '../../types/home';
import { wp, hp } from '../../utils/reponsive';

const { width } = Dimensions.get('window');

// 카드 하나의 너비 (화면의 약 80%)
const CARD_WIDTH = width * 0.8;
// 카드 사이의 간격
const SPACING = -5;
// 스냅이 걸릴 실제 구간 크기 (카드 너비 + 간격)
const SNAP_SIZE = CARD_WIDTH + SPACING;
// 첫 번째 아이템이 가운데 오게 하기 위한 옆 여백 계산
const SIDE_SPACER = (width - SNAP_SIZE) / 2 + SPACING / 2;

interface Props {
  data: BannerItem[];
}

const HomeBanner = ({ data }: Props) => {
  // 스크롤 값을 추적하기 위한 Animated Value
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }: { item: BannerItem; index: number }) => {
    // scale 애니메이션 로직
    const inputRange = [
      (index - 1) * SNAP_SIZE, // 이전 카드 위치
      index * SNAP_SIZE, // 현재 카드 위치 (가운데)
      (index + 1) * SNAP_SIZE, // 다음 카드 위치
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9], // 옆에 있을 땐 0.9배, 가운데는 1배
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6], // (선택사항) 옆에 있는건 살짝 흐리게
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            transform: [{ scale }], // 크기 조절 적용
            opacity: opacity, // 투명도 조절 적용 (취향따라 제거 가능)
          },
        ]}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>추천 콘텐츠</Text>
      <Animated.FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        // 스크롤 이벤트 연결 (useNativeDriver 필수)
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        // 스냅 설정 (가운데 정렬의 핵심)
        snapToInterval={SNAP_SIZE}
        decelerationRate="fast"
        bounces={false}
        // 양옆 여백을 줘서 첫번째/마지막 아이템도 가운데 오게 함
        contentContainerStyle={{
          paddingHorizontal: SIDE_SPACER,
        }}
        // 렌더링
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}

        // 아이템 간격 설정 (ItemSeparatorComponent 대신 컴포넌트 마진으로 처리)
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: hp(30) },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: wp(20),
    marginBottom: 15,
    color: '#000',
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: hp(180),
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#eee',
    marginRight: SPACING, // 오른쪽 간격만 줌
  },
  image: { width: '100%', height: '100%' },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
  },
});

export default HomeBanner;
