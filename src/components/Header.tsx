import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SquadRoomIcon from '../../assets/icons/squadroom-icon.svg';
import { hp, wp } from '../utils/reponsive';
import SearchIcon from '../../assets/icons/search.svg';
import NotificationIcon from '../../assets/icons/bell.svg';
import BackIcon from '../../assets/icons/backBtn.svg';

export default function Header({
  isSecond = false,
  headerText,
  action,
}: {
  isSecond?: boolean;
  headerText?: string;
  action?: () => void;
}) {
  return (
    <SafeAreaView edges={['top']}>
      {isSecond ? (
        <View style={styles.secondContainer}>
          <TouchableOpacity onPress={action}>
            <BackIcon style={styles.subIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{headerText}</Text>
          <View style={{ width: hp(24), height: wp(24) }} />
        </View>
      ) : (
        <View style={styles.container}>
          <SquadRoomIcon style={styles.mainIcon} />
          <View style={styles.subIconContainer}>
            <NotificationIcon style={styles.subIcon} />

            <SearchIcon style={styles.subIcon} />
          </View>
        </View>
      )}
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
  secondContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  backIcon: {
    width: wp(24),
    height: hp(24),
  },
  headerText: {
    fontWeight: 700,
    fontSize: hp(16),
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
