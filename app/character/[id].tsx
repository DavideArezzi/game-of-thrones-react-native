import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { characterApi } from "../../service/apiCharacter";
import { CharacterModel } from "../../types/CharacterModel";

type RootStackParamList = {
  CharacterDetail: { id: number };
};

type CharacterDetailRouteProp = RouteProp<
  RootStackParamList,
  "CharacterDetail"
>;

export default function CharacterDetail() {
  const route = useRoute<CharacterDetailRouteProp>();
  const { id } = route.params;

  const [character, setCharacter] = useState<CharacterModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const result = await characterApi.getCharacterById(id);
        setCharacter(result);
      } catch (err) {
        setError("Errore nel recupero del personaggio.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Caricamento...</Text>
      </View>
    );
  }

  if (error || !character) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          {error || "Personaggio non trovato"}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: character.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{character.fullNAme}</Text>
      <Text style={styles.title}>{character.title}</Text>
      <Text style={styles.family}>Famiglia: {character.family}</Text>
    </ScrollView>
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
  container: {
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 10,
  },
  family: {
    fontSize: 16,
    color: "#555",
  },
});
