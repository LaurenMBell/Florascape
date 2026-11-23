import { Image } from "expo-image";
import { View, StyleSheet } from "react-native";

type AvatarProps = {
  uri?: string;
  size?: number;
};

export function Avatar({ uri, size = 96 }: AvatarProps) {
  return (
    <View style={[styles.frame, { width: size, height: size }]}>
      {uri ? (
        <Image source={{ uri }} style={styles.image} contentFit="cover" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#ddd", 
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
});

// https://www.typescriptcourse.com/tutorials/build-a-dynamic-avatar-component-with-react-typescript
