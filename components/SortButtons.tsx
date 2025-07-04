import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { styles } from "@/styles/SortButtonsStyles";

interface SortButtonsProps {
  sortOrder: "asc" | "desc";
  onSortChange: (order: "asc" | "desc") => void;
}

export const SortButtons: React.FC<SortButtonsProps> = ({
  sortOrder,
  onSortChange,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, sortOrder === "asc" && styles.activeButton]}
        onPress={() => onSortChange("asc")}
      >
        <ThemedText
          style={[
            styles.buttonText,
            sortOrder === "asc" && styles.activeButtonText,
          ]}
        >
          A-Z
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, sortOrder === "desc" && styles.activeButton]}
        onPress={() => onSortChange("desc")}
      >
        <ThemedText
          style={[
            styles.buttonText,
            sortOrder === "desc" && styles.activeButtonText,
          ]}
        >
          Z-A
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};
