import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { styles } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, style, ...rest }: Props) {
  return (
    <TouchableOpacity style={[styles.container, style]} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
