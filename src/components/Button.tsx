import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "~/styles/globalColors";

type primaryColors = "dark" | "blue" | "gray";

interface ButtonProps {
  title: string,
  color: primaryColors,
  onPress: () => void
}

export function Button({ title, color, onPress }: ButtonProps) {

  function getColor(color: primaryColors) {
    if (color === "dark") return colors.dark;
    else if (color === "blue") return colors.blue;
    else return colors.gray;
  }

  return (
    <TouchableOpacity 
      style={[styles.container, {backgroundColor: getColor(color)}]}
      onPress={onPress}
    >
      <Text style={[styles.text]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 15
  },
  text: {
    color: colors.white,
    fontWeight: "bold",
  }
});