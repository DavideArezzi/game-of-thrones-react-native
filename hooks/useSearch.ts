import { useState, useMemo } from "react";
import { Character } from "@/types/Character";

export const useSearch = (characters: Character[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredAndSortedCharacters = useMemo(() => {
    let filtered = characters.filter(
      (character) =>
        character.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.fullName.localeCompare(b.fullName);
      } else {
        return b.fullName.localeCompare(a.fullName);
      }
    });

    return filtered;
  }, [characters, searchQuery, sortOrder]);

  return {
    searchQuery,
    setSearchQuery,
    sortOrder,
    setSortOrder,
    filteredAndSortedCharacters,
  };
};
