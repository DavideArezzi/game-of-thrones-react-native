import React, { useCallback } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useCharacterStore } from "@/store/characterStore";
import { Character } from "@/types/Character";
import { styles } from "@/styles/FavoritesStyles";

export default function FavoritesScreen() {
  const { favorites, removeFromFavorites } = useCharacterStore();

  const handleCharacterPress = useCallback((characterId: number) => {
    router.push({
      pathname: "/character/[id]",
      params: { id: characterId.toString() },
    });
  }, []);

  const handleRemoveFavorite = useCallback(
    (characterId: number) => {
      removeFromFavorites(characterId);
    },
    [removeFromFavorites]
  );

  const renderCharacter = useCallback(
    ({ item }: { item: Character }) => (
      <TouchableOpacity
        style={styles.characterCard}
        onPress={() => handleCharacterPress(item.id)}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.characterImage}
          contentFit="cover"
          placeholder="https://via.placeholder.com/60x60?text=No+Image"
        />
        <View style={styles.characterInfo}>
          <ThemedText type="defaultSemiBold" style={styles.characterName}>
            {item.fullName}
          </ThemedText>
          <ThemedText style={styles.characterTitle}>
            {item.title || "No title"}
          </ThemedText>
          <ThemedText style={styles.characterFamily}>
            {item.family || "Unknown family"}
          </ThemedText>
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => handleRemoveFavorite(item.id)}
          activeOpacity={0.7}
        >
          <IconSymbol size={24} name="heart.fill" color="#ff6b6b" />
        </TouchableOpacity>
      </TouchableOpacity>
    ),
    [handleCharacterPress, handleRemoveFavorite]
  );

  const keyExtractor = useCallback((item: Character) => item.id.toString(), []);

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <IconSymbol size={64} name="heart" color="#999" />
      <ThemedText style={styles.emptyText}>
        No favorite characters yet
      </ThemedText>
      <ThemedText style={styles.emptySubText}>
        Add some characters to your favorites!
      </ThemedText>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Favorites
        </ThemedText>
      </ThemedView>

      <FlatList
        data={favorites}
        renderItem={renderCharacter}
        keyExtractor={keyExtractor}
        contentContainerStyle={[
          styles.listContainer,
          favorites.length === 0 && { flex: 1 },
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState />}
      />
    </ThemedView>
  );
}
