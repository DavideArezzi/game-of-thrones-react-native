// Definisci costanti fuori dallo StyleSheet
import { StyleSheet } from "react-native";
// ...existing code...
export const colors = {
  primary: "#007AFF",
  secondary: "#ff6b6b",
  background: "#f5f5f5",
  cardBackground: "#fff",
  text: "#333",
  textSecondary: "#666",
  textLight: "#888",
  border: "#e0e0e0",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  small: 8,
  medium: 12,
  large: 16,
  round: 25,
};

export const commonStyles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
