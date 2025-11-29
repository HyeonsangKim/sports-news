// src/navigation/MainTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import MyPageScreen from '../screens/MyPageScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { fp, hp, wp } from '../utils/reponsive';
import Home from '../../assets/icons/home.svg';
import HomeOutline from '../../assets/icons/home-outline.svg';
import BookOutline from '../../assets/icons/book-outline.svg';
import CalendarOutline from '../../assets/icons/calender-outline.svg';
import PeopleOutline from '../../assets/icons/people-outline.svg';
import ProfileOutline from '../../assets/icons/profile-outline.svg';
import CalenderScreen from '../screens/CalenderScreen';
// Type 정의
export type HomeStackParamList = {
  HomeMain: undefined;
};

export type MyPageStackParamList = {
  MyPageMain: undefined;
  Settings: undefined;
};

export type CalendarStackParamList = {
  CalenderScreen: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  MyPage: undefined;
  Calendar: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const MyPageStack = createNativeStackNavigator<MyPageStackParamList>();
const CalenderStack = createNativeStackNavigator<CalendarStackParamList>();

// 홈 스택 (중첩 네비게이터)
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          title: '홈',
          headerShown: false, // 커스텀 헤더 쓸 거면
        }}
      />
    </HomeStack.Navigator>
  );
};

const CalenderStackNavigator = () => {
  return (
    <CalenderStack.Navigator>
      <CalenderStack.Screen
        name="CalenderScreen"
        component={CalenderScreen}
        options={{
          title: '홈',
          headerShown: false, // 커스텀 헤더 쓸 거면
        }}
      />
    </CalenderStack.Navigator>
  );
};

// 마이페이지 스택
const MyPageStackNavigator = () => {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen
        name="MyPageMain"
        component={MyPageScreen}
        options={{
          title: '마이페이지',
          headerShown: false,
        }}
      />
      <MyPageStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: '설정',
          headerShown: true,
        }}
      />
    </MyPageStack.Navigator>
  );
};

// 메인 탭 네비게이터
const MainTabNavigator = () => {
  const iconSize = wp(24);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Stack에서 헤더 관리
        tabBarIcon: ({ focused }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              return focused ? (
                <Home width={iconSize} />
              ) : (
                <HomeOutline width={iconSize} />
              );
            case 'Calendar':
              return focused ? (
                <CalendarOutline width={iconSize} />
              ) : (
                <CalendarOutline width={iconSize} />
              );
              break;
            case 'MyPage':
              return focused ? (
                <Home width={iconSize} />
              ) : (
                <HomeOutline width={iconSize} />
              );
              break;
          }
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          height: Platform.OS === 'ios' ? hp(88) : hp(60),
          paddingBottom: Platform.OS === 'ios' ? hp(20) : hp(8),
          paddingTop: hp(8),
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
        },
        tabBarLabelStyle: {
          fontSize: fp(11),
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: '홈',
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalenderStackNavigator}
        options={{
          tabBarLabel: '캘린더',
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageStackNavigator}
        options={{
          tabBarLabel: '마이',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
