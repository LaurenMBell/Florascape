//FOR VIEWING ANY SIGHTING
import { useLocalSearchParams } from 'expo-router';

export default function SightingViewingScreen() {
  const { sightingID } = useLocalSearchParams<{ sightingID: string }>();

  // any sighting and it's associated data
}