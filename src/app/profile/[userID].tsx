// PROFILE PAGE OF OTHER USERS
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ProfileHeader } from '@/components/profile-header';

export default function UserProfileScreen() {
  const { userID } = useLocalSearchParams<{ userID: string }>();

  return (
    <View style={styles.container}>
      <ProfileHeader
        displayName={`User ${userID ?? ''}`}
        avatarUri={undefined}
        friendCount={0}
        favoritePlant="oregon grape"
        totalSightings={0}
        level={1}
        xpProgress={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
});
