import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { CharacterModel } from "../../types/CharacterModel";
import { characterApi } from "../../service/apiCharacter";
import { CharacterCard } from "@/components/ui/CharacterCard";

export default function CharacterList() {
  const [loading, setLoading] = useState<boolean>(true);
  const [characters, setCharacters] = useState<CharacterModel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        const response = await characterApi.getAllCharacters();
        if (response) {
          setCharacters(response);
        } else {
          setError("No characters found");
        }
      } catch (err) {
        setError("Error loading characters");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={characters}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <CharacterCard character={item} />}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontSize: 18,
  },
});
