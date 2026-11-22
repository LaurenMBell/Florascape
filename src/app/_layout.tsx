import { Stack } from 'expo-router'

import { SplashScreenController } from '@/components/splash-screen-controller'

import { useAuthContext } from '@/hooks/use-auth-context'
import AuthProvider from '@/providers/auth-provider'

import { View, ActivityIndicator } from 'react-native'

function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuthContext()

  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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