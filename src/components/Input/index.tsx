import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme/colors";

export function Input({ style, ...rest }: TextInputProps){
    return (
        <TextInput style={[styles.container, style]} placeholderTextColor={colors.gray600} {...rest}/>
    )
}
