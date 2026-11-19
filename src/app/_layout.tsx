import AuthProvider from "@/providers/AuthProvider";
import {Slot} from "expo-router";
import {ReactNode} from "react";

export default function RootLayout(): ReactNode {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}

// EXPO ROUTING: https://docs.expo.dev/router/basics/core-concepts/