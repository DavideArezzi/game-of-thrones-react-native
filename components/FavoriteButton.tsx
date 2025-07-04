import React from "react";
import { TouchableOpacity } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { styles } from "@/styles/FavoriteButtonStyles";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
  size?: number;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onPress,
  size = 24,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <IconSymbol
        size={size}
        name={isFavorite ? "heart.fill" : "heart"}
        color={isFavorite ? "#ff6b6b" : "#666"}
      />
    </TouchableOpacity>
  );
};
