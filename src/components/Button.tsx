import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { colors } from "~/styles/globalColors";
import { fonts } from "~/styles/globalFonts";
import { rw, rh, rf } from "~/styles/globalSizes";

type primaryColors = "dark" | "blue" | "gray";

interface ButtonProps {
  title: string,
  color: primaryColors,
  onPress: () => void,
  width: number,
}

export function Button({ title, color, onPress, width }: ButtonProps) {

  function getColor(color: primaryColors) {
    if (color === "dark") return colors.dark;
    else if (color === "blue") return colors.blue;
    else return colors.gray;
  }

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: getColor(color), width }]}
      onPress={onPress}
    >
      <Text style={[styles.text]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: rh(15)
  },
  text: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: rf(20)
  }
});
