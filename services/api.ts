import { Character } from "@/types/Character";

const API_BASE_URL = "https://thronesapi.com/api/v2";

export const characterAPI = {
  getAllCharacters: async (): Promise<Character[]> => {
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

  getCharacterById: async (id: number): Promise<Character> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Characters/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch character");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching character:", error);
      throw error;
    }
  },
};
