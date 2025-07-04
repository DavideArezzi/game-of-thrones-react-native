import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Character } from "@/types/Character";
import { styles } from "@/styles/CharacterCardStyles";

interface CharacterCardProps {
  character: Character;
  isFavorite: boolean;
  onToggleFavorite: (character: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = memo(
  ({ character, isFavorite, onToggleFavorite }) => {
    const handlePress = () => {
      router.push({
        pathname: "/character/[id]",
        params: { id: character.id.toString() },
      });
    };

    const handleToggleFavorite = () => {
      onToggleFavorite(character);
    };

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: character.imageUrl }}
          style={styles.image}
          contentFit="cover"
          placeholder="https://via.placeholder.com/60x60?text=No+Image"
        />
        <View style={styles.info}>
          <ThemedText type="defaultSemiBold" style={styles.name}>
            {character.fullName}
          </ThemedText>
          <ThemedText style={styles.title}>
            {character.title || "No title"}
          </ThemedText>
          <ThemedText style={styles.family}>
            {character.family || "Unknown family"}
          </ThemedText>
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
          activeOpacity={0.7}
        >
          <IconSymbol
            size={24}
            name={isFavorite ? "heart.fill" : "heart"}
            color={isFavorite ? "#ff6b6b" : "#666"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
);

CharacterCard.displayName = "CharacterCard";
