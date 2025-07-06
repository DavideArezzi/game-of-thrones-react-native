import { CharacterModel } from "@/types/CharacterModel";

const API_BASE_URL = "https://thronesapi.com/api/v2";

export const characterApi = {
  getAllCharacters: async (): Promise<CharacterModel[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Characters`);
      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw error;
    }
  },

  getCharacterById: async (id: number): Promise<CharacterModel> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Characters/${id}`);
      if (!response.ok) {
        throw new Error("Errore nel recupero del personaggio");
      }
      return await response.json();
    } catch (error) {
      console.error("Errore nel recupero del personaggio: ", error);
      throw error;
    }
  },
};
