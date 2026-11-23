import { Stack } from 'expo-router'

import { SplashScreenController } from '@/components/splash-screen-controller'

import { useAuthContext } from '@/hooks/use-auth-context'
import AuthProvider from '@/providers/auth-provider'

function RootNavigator() {
  const { isLoggedIn } = useAuthContext()

  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="profile/[userID]" options={{ title: 'Profile'}} />
        <Stack.Screen name="sightings/[sightingID]" options={{ title: 'Sightings'}} />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Screen name="+not-found" />
    </Stack>
  )
}
export default function RootLayout() {
  return (
      <AuthProvider>
        <SplashScreenController />
        <RootNavigator />
      </AuthProvider>
  )
}

// EXPO ROUTING: https://docs.expo.dev/router/basics/core-concepts/