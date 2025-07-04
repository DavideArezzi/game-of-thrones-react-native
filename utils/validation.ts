import { Character } from "@/types/Character";

export const validation = {
  isValidUrl: (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  isValidEmail: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidCharacter: (character: any): character is Character => {
    return (
      typeof character === "object" &&
      character !== null &&
      typeof character.id === "number" &&
      typeof character.fullName === "string" &&
      typeof character.title === "string" &&
      typeof character.family === "string" &&
      typeof character.imageUrl === "string"
    );
  },
};
