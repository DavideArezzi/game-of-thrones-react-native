import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FlatList, TouchableOpacity, View, TextInput } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useCharacterStore } from "@/store/characterStore";
import { Character } from "@/types/Character";
import { styles } from "@/styles/HomeStyles";

export default function HomeScreen() {
  const {
    characters,
    favorites,
    fetchCharacters,
    addToFavorites,
    removeFromFavorites,
  } = useCharacterStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCharacters = async () => {
      if (characters.length === 0) {
        setIsLoading(true);
        try {
          await fetchCharacters();
        } catch (error) {
          console.error("Failed to load characters:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadCharacters();
  }, [fetchCharacters, characters.length]);

  const filteredCharacters = useMemo(() => {
    let filtered = characters.filter((character) =>
      character.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.fullName.localeCompare(b.fullName);
      } else {
        return b.fullName.localeCompare(a.fullName);
      }
    });

    return filtered;
  }, [characters, searchQuery, sortOrder]);

  const toggleFavorite = useCallback(
    (character: Character) => {
      if (favorites.some((fav) => fav.id === character.id)) {
        removeFromFavorites(character.id);
      } else {
        addToFavorites(character);
      }
    },
    [favorites, addToFavorites, removeFromFavorites]
  );

  const isFavorite = useCallback(
    (id: number) => {
      return favorites.some((fav) => fav.id === id);
    },
    [favorites]
  );

  const handleCharacterPress = useCallback((characterId: number) => {
    router.push({
      pathname: "/character/[id]",
      params: { id: characterId.toString() },
    });
  }, []);

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
          onPress={() => toggleFavorite(item)}
          activeOpacity={0.7}
        >
          <IconSymbol
            size={24}
            name={isFavorite(item.id) ? "heart.fill" : "heart"}
            color={isFavorite(item.id) ? "#ff6b6b" : "#666"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    ),
    [isFavorite, toggleFavorite, handleCharacterPress]
  );

  const keyExtractor = useCallback((item: Character) => item.id.toString(), []);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Game of Thrones
        </ThemedText>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search characters..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.sortContainer}>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortOrder === "asc" && styles.sortButtonActive,
            ]}
            onPress={() => setSortOrder("asc")}
            activeOpacity={0.7}
          >
            <ThemedText
              style={[
                styles.sortButtonText,
                sortOrder === "asc" && { color: "#fff" },
              ]}
            >
              A-Z
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortOrder === "desc" && styles.sortButtonActive,
            ]}
            onPress={() => setSortOrder("desc")}
            activeOpacity={0.7}
          >
            <ThemedText
              style={[
                styles.sortButtonText,
                sortOrder === "desc" && { color: "#fff" },
              ]}
            >
              Z-A
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      <FlatList
        data={filteredCharacters}
        renderItem={renderCharacter}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        onRefresh={fetchCharacters}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <IconSymbol size={64} name="person.2" color="#999" />
            <ThemedText style={styles.emptyText}>
              {searchQuery ? "No characters found" : "No characters available"}
            </ThemedText>
            <ThemedText style={styles.emptySubText}>
              {searchQuery
                ? "Try adjusting your search"
                : "Pull down to refresh"}
            </ThemedText>
          </View>
        }
      />
    </ThemedView>
  );
}
