import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { fp, hp, wp } from '../utils/reponsive';

const SignupSuccess = () => {
  return (
    <View style={styles.container}>
      <View style={styles.checkCircle}>
        <Check size={wp(80)} color="#000" strokeWidth={3} />
      </View>
      <Text style={styles.successText}>가입이 완료되었습니다</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkCircle: {
    width: wp(150),
    height: wp(150),
    borderRadius: wp(75),
    borderWidth: 4,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(30),
  },
  successText: {
    fontSize: fp(24),
    fontWeight: 'bold',
    color: '#000',
  },
});

export default SignupSuccess;
