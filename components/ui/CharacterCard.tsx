import { CharacterModel } from "@/types/CharacterModel";
import { router } from "expo-router";
import { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
interface characterCardProps {
  character: CharacterModel;
}

export const CharacterCard: React.FC<characterCardProps> = memo(
  ({ character }) => {
    const handlePress = () => {
      router.push({
        pathname: "../character/[id]",
        params: { id: character.id.toString() },
      });
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
            {character.fullNAme}
          </ThemedText>
          <ThemedText style={styles.title}>
            {character.title || "No title"}
          </ThemedText>
          <ThemedText style={styles.family}>
            {character.family || "Unknown family"}
          </ThemedText>
        </View>
      </TouchableOpacity>
    );
  }
);

import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  family: {
    fontSize: 14,
    color: "#888",
  },
  favoriteButton: {
    padding: 8,
  },
});
