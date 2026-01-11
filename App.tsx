// App.tsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import RootNavigator from './src/navigation';
import { StatusBar } from 'react-native';
import queryClient from './src/api/queryClient';

// React Native Screens 최적화 활성화
enableScreens();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* Status Bar 설정 추가 
          - barStyle="dark-content": 글자/아이콘을 검은색으로 (배경이 흰색이므로)
          - backgroundColor: 안드로이드 배경색 설정
          - translucent: 안드로이드도 iOS처럼 내용이 상태바 뒤로 올라가게 설정 (레이아웃 일치를 위해 중요)
        */}
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <QueryClientProvider client={queryClient}>
          <RootNavigator />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
