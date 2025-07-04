import React from "react";
import { TextInput, View } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { styles } from "@/styles/SearchBarStyles";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search...",
}) => {
  return (
    <View style={styles.container}>
      <IconSymbol size={20} name="magnifyingglass" color="#666" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
      />
    </View>
  );
};
