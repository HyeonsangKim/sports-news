module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // 이 플러그인은 항상 마지막에 위치해야 함
  ],
};