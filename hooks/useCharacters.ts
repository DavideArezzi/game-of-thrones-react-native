import { useState, useEffect } from "react";
import { Character } from "@/types/Character";
import { characterAPI } from "@/services/api";

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await characterAPI.getAllCharacters();
      setCharacters(data);
    } catch (err) {
      setError("Failed to fetch characters");
      console.error("Error fetching characters:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return {
    characters,
    loading,
    error,
    refetch: fetchCharacters,
  };
};
