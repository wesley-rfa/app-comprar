import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        height: 48,
        width: "100%",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 600
    }
})