// src/navigation/index.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { ActivityIndicator, View } from 'react-native';
import MainTabNavigator from './MainTabNavigator';

export type RootStackParamList = {
  Auth: undefined;
  MainTab: undefined;
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  Signup: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

// 인증 전 화면
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

const RootNavigator = () => {
  // TODO: 인증 상태 확인 (나중에 로그인 될떄 추가좀 zustand 사용해서 맘대로 바꾸셈)
  // const { isAuthenticated, isLoading } = useAuth();
  // TODO: 인증 상태 확인 (나중에 로그인 될떄 저위에껄로 바꿔야함) true로 하면 홈으로 들어갈수있음 false로 바꾸면 로그인
  const isAuthenticated = true;
  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="#007AFF" />
  //     </View>
  //   );
  // }
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="MainTab" component={MainTabNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
