import React from "react";
import { ActivityIndicator, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styles } from "@/styles/LoadingScreenStyles";

export const LoadingScreen: React.FC = () => {
  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <ThemedText style={styles.text}>Loading characters...</ThemedText>
    </ThemedView>
  );
};
