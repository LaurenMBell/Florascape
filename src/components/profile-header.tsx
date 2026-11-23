import { Avatar } from '@/components/avatar';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  displayName: string;       
  avatarUri?: string;
  friendCount: number;
  favoritePlant: string;
  totalSightings: number;
  level: number;
  xpProgress: number;        
};

export function ProfileHeader(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <Text style={styles.statText}>Friends: {props.friendCount}</Text>
        <Text style={styles.statText}>Favorite Plant: {props.favoritePlant}</Text>
        <Text style={styles.statText}>Total Sightings: {props.totalSightings}</Text>
        <View style={styles.levelRow}>
          <Text style={styles.levelText}>{props.level}</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${props.xpProgress * 100}%` }]} />
          </View>
        </View>
      </View>
        <View style={styles.avatarInfo}>
        <Avatar uri={props.avatarUri} />
        <Text style={styles.displayName}>{props.displayName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 112,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#30363d',
    borderBottomWidth: 1,
    borderBottomColor: '#414952',
  },
  stats: {
    flex: 1,
    gap: 6,
    paddingRight: 20,
    color: '#f0c75e',
  },
  statText: {
    color: '#e6e9ed',
    fontSize: 14,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 2,
  },
  levelText: {
    color: '#f0c75e',
    fontSize: 13,
    fontWeight: '700',
  },
  barTrack: {
    flex: 1,
    maxWidth: 180,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#4a525c',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#87b86f',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    borderRadius: 28,
    borderColor: '#87b86f',
  },
  avatarInfo: { 
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  displayName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});

//https://www.typescriptcourse.com/tutorials/build-a-dynamic-avatar-component-with-react-typescript