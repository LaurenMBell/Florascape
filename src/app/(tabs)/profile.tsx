//LOGGED IN USER'S PROFILE PAGE
import { useAuthContext } from '@/hooks/use-auth-context';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ProfileHeader } from '@/components/profile-header';
import SignOutButton from '@/components/sign-out-button';
import { supabase } from '@/lib/supabase'

type User = {
  uuid: string
  created_at: string
  experience: number
  is_public: boolean
  is_developer: boolean
  biography: string
  username: string
  friend_count: number
  level: number
  favorite_plant: string
  total_sightings: number
  favorite_species: string
}

export default function ProfileScreen() {
  const { profile } = useAuthContext();
  const [ userData, setUserData ] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getUserData() {
      const { data, error } = await supabase.from('profiles').select().eq('id',profile.id).single();
      if (error) {
        setError(error.message);
        return;
      }
      setUserData(data ?? []);
    }

    if(!profile){
      return; // If profile isn't loaded, it pauses
    } else {
      getUserData();
    }
  }, [profile]); // [profile] makes it re-render when profile changes

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading profile data: {error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>PROFILE - MOBILE</Text>
      <ProfileHeader
        displayName={userData.username}
        avatarUri={undefined}
        friendCount={userData.friend_count}
        favoritePlant={userData.favorite_species}
        totalSightings={userData.total_sightings}
        level={userData.level}
        xpProgress={userData.experience}
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
