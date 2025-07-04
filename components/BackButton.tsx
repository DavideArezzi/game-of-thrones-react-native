import React from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { styles } from "@/styles/FavoriteButtonStyles";

export const BackButton: React.FC = () => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => router.back()}>
      <IconSymbol size={24} name="chevron.left" color="#007AFF" />
    </TouchableOpacity>
  );
};
