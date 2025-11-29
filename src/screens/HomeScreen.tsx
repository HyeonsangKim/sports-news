import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView>
        <Text>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text>login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
