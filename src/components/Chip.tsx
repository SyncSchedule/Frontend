import { View, Text, StyleSheet } from 'react-native';
import { colors } from '~/styles/globalColors';
import { rf, rh, rw } from '~/styles/globalSizes';

interface ChipProps {
  text: string;
  color: string;
  textColor?: string;
  textSize?: number;
}

export function Chip({ text, color, textColor, textSize }: ChipProps) {

  return (
    <View style={[styles.container, { backgroundColor: `${color}` }]}>
      <Text style={{ color: textColor ? textColor : colors.black, 
                    fontSize: textSize ? textSize : rf(14) }}>
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingVertical: rh(10),
    paddingHorizontal: rw(20),
    borderRadius: rw(15),
  }
});
