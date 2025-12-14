import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SquadRoomIcon from '../../assets/icons/squadroom-icon.svg';
import { hp, wp } from '../utils/reponsive';
import SearchIcon from '../../assets/icons/search.svg';
import NotificationIcon from '../../assets/icons/bell.svg';

export default function Header() {
  return (
    <SafeAreaView edges={['top']}>
      <View style={styles.container}>
        <SquadRoomIcon style={styles.mainIcon} />
        <View style={styles.subIconContainer}>
          <NotificationIcon style={styles.subIcon} />

          <SearchIcon style={styles.subIcon} />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: hp(60),
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
  },
  subIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(20),
  },
  mainIcon: {
    width: wp(138),
    height: hp(40),
  },
  subIcon: {
    width: wp(24),
    height: hp(24),
  },
});
