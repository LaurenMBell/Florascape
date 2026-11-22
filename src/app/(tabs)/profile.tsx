//LOGGED IN USER'S PROFILE PAGE
import { useAuthContext } from '@/hooks/use-auth-context';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { ProfileHeader } from '@/components/profile-header';
import SignOutButton from '@/components/sign-out-button';

export default function ProfileScreen() {
  const {profile, signOut, token} = useAuthContext()

  return (
    <View style={styles.container}>
      <Text>PROFILE - MOBILE</Text>
      <ProfileHeader
        displayName="lauren bell"
        avatarUri={undefined}
        friendCount={1000}
        favoritePlant="big leaf maple"
        totalSightings={1000000}
        level={60}
        xpProgress={0.33}
      />
      <SignOutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16
  },
  text: {
    fontSize: 30,
    color: '#fff',
  },
});
