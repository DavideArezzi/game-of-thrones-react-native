import { useEffect, useState } from "react";
import { CharacterModel } from "../types/CharacterModel";
import { characterApi } from "../service/apiCharacter";

export const useCharacter = () => {
  const [loading, Loading] = useState<boolean>(true);
  const [error, Error] = useState<string | null>(null);
  const [characters, Characters] = useState<CharacterModel[]>([]);

  useEffect(() => {
    fatchCharacters();
  }, []);

  const fatchCharacters = async () => {
    try {
      Loading(true);
      Error(null);
      const resposnse = await characterApi.getAllCharacters();
      Characters(resposnse);
    } catch (error) {
      Error("Failed to fetch characters");
      console.error("Error fetching characters:", error);
    } finally {
      Loading(false);
    }
  };

  return {
    characters,
    loading,
    error,
  };
};
