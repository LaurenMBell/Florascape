import { useAuthContext } from '@/hooks/use-auth-context'
import { SplashScreen } from 'expo-router'
import { useEffect } from 'react'

SplashScreen.preventAutoHideAsync().catch(() => {})

export function SplashScreenController() {
  const { isLoading } = useAuthContext()
  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync().catch(() => {})
    }
  }, [isLoading])
  return null
}