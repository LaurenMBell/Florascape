//LOGGED IN USER'S PROFILE PAGE
import { Button, StyleSheet, View, Text } from 'react-native';
import { useAuthSession } from "@/providers/AuthProvider";
import { ProfileHeader } from '@/components/profile-header';

export default function ProfileScreen() {
  const { signOut } = useAuthSession();
    
  return (
    <View style={styles.container}>
      <Text>PROFILE - WEB</Text>
      <ProfileHeader
        displayName="lauren bell"
        avatarUri={undefined}
        friendCount={100}
        favoritePlant="big leaf maple"
        totalSightings={10}
        level={10}
        xpProgress={4}
      />
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: '#fff',
  },
});
