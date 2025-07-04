import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Character } from "@/types/Character";

interface CharacterStore {
  characters: Character[];
  favorites: Character[];
  isLoading: boolean;
  error: string | null;
  fetchCharacters: () => Promise<void>;
  addToFavorites: (character: Character) => void;
  removeFromFavorites: (id: number) => void;
  clearError: () => void;
}

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set, get) => ({
      characters: [],
      favorites: [],
      isLoading: false,
      error: null,

      fetchCharacters: async () => {
        // Evita fetch multipli simultanei
        const { isLoading, characters } = get();
        if (isLoading) return;

        set({ isLoading: true, error: null });

        try {
          const response = await fetch(
            "https://thronesapi.com/api/v2/Characters"
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          // Valida che i dati siano un array
          if (!Array.isArray(data)) {
            throw new Error("Invalid data format received");
          }

          // Mappa i dati per assicurarci che abbiano la struttura corretta
          const mappedCharacters: Character[] = data.map((char: any) => ({
            id: char.id || 0,
            firstName: char.firstName || "",
            lastName: char.lastName || "",
            fullName:
              char.fullName ||
              `${char.firstName || ""} ${char.lastName || ""}`.trim() ||
              "Unknown",
            title: char.title || "",
            family: char.family || "",
            image: char.image || "",
            imageUrl:
              char.imageUrl ||
              char.image ||
              "https://via.placeholder.com/300x300?text=No+Image",
          }));

          set({
            characters: mappedCharacters,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";
          console.error("Error fetching characters:", errorMessage);
          set({
            isLoading: false,
            error: errorMessage,
          });
        }
      },

      addToFavorites: (character: Character) => {
        const { favorites } = get();
        if (!favorites.some((fav) => fav.id === character.id)) {
          set({ favorites: [...favorites, character] });
        }
      },

      removeFromFavorites: (id: number) => {
        const { favorites } = get();
        set({ favorites: favorites.filter((fav) => fav.id !== id) });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "character-store",
      storage: createJSONStorage(() => AsyncStorage),
      // Persiste solo i favoriti, non tutti i characters per evitare problemi di storage
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
