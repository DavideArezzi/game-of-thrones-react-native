import React from "react";
import { FlatList } from "react-native";
import { CharacterCard } from "@/components/CharacterCard";
import { Character } from "@/types/Character";
import { styles } from "@/styles/CharacterListStyles";

interface CharacterListProps {
  characters: Character[];
  favorites: Character[];
  onToggleFavorite: (character: Character) => void;
}

export const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  favorites,
  onToggleFavorite,
}) => {
  const isFavorite = (character: Character) => {
    return favorites.some((fav) => fav.id === character.id);
  };

  const renderCharacter = ({ item }: { item: Character }) => (
    <CharacterCard
      character={item}
      isFavorite={isFavorite(item)}
      onToggleFavorite={onToggleFavorite}
    />
  );

  return (
    <FlatList
      data={characters}
      renderItem={renderCharacter}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};
