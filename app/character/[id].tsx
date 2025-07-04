import React, { useEffect, useState, useCallback, useMemo } from "react";
import { ScrollView, TouchableOpacity, View, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Image } from "expo-image";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useCharacterStore } from "@/store/characterStore";
import { Character } from "@/types/Character";
import { styles } from "@/styles/DetailStyles";

export default function CharacterDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { characters, favorites, addToFavorites, removeFromFavorites } =
    useCharacterStore();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const characterId = useMemo(() => {
    const parsedId = parseInt(id as string);
    return isNaN(parsedId) ? null : parsedId;
  }, [id]);

  useEffect(() => {
    if (characterId === null) {
      setIsLoading(false);
      return;
    }

    const foundCharacter = characters.find((char) => char.id === characterId);
    setCharacter(foundCharacter || null);
    setIsLoading(false);
  }, [characterId, characters]);

  const isFavorite = useMemo(() => {
    if (!character) return false;
    return favorites.some((fav) => fav.id === character.id);
  }, [character, favorites]);

  const toggleFavorite = useCallback(() => {
    if (!character) return;

    if (isFavorite) {
      removeFromFavorites(character.id);
    } else {
      addToFavorites(character);
    }
  }, [character, isFavorite, addToFavorites, removeFromFavorites]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  }, []);

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <View
          style={[
            styles.container,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <ThemedText>Loading...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (characterId === null) {
    return (
      <ThemedView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <IconSymbol size={24} name="chevron.left" color="#007AFF" />
        </TouchableOpacity>
        <View
          style={[
            styles.container,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <ThemedText>Invalid character ID</ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (!character) {
    return (
      <ThemedView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <IconSymbol size={24} name="chevron.left" color="#007AFF" />
        </TouchableOpacity>
        <View
          style={[
            styles.container,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <ThemedText>Character not found</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBack}
        activeOpacity={0.7}
      >
        <IconSymbol size={24} name="chevron.left" color="#007AFF" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: character.imageUrl }}
            style={styles.characterImage}
            contentFit="cover"
            placeholder="https://via.placeholder.com/400x400?text=No+Image"
          />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
            activeOpacity={0.7}
          >
            <IconSymbol
              size={32}
              name={isFavorite ? "heart.fill" : "heart"}
              color={isFavorite ? "#ff6b6b" : "#666"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <ThemedText type="title" style={styles.characterName}>
            {character.fullName}
          </ThemedText>

          <View style={styles.infoRow}>
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Title:
            </ThemedText>
            <ThemedText style={styles.value}>
              {character.title || "No title"}
            </ThemedText>
          </View>

          <View style={styles.infoRow}>
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Family:
            </ThemedText>
            <ThemedText style={styles.value}>
              {character.family || "Unknown family"}
            </ThemedText>
          </View>

          {character.firstName && (
            <View style={styles.infoRow}>
              <ThemedText type="defaultSemiBold" style={styles.label}>
                First Name:
              </ThemedText>
              <ThemedText style={styles.value}>
                {character.firstName}
              </ThemedText>
            </View>
          )}

          {character.lastName && (
            <View style={styles.infoRow}>
              <ThemedText type="defaultSemiBold" style={styles.label}>
                Last Name:
              </ThemedText>
              <ThemedText style={styles.value}>{character.lastName}</ThemedText>
            </View>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}
