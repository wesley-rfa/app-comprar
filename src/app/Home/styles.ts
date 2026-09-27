import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.background,
        paddingTop: 16
    },
    logo: {
        height: 34,
        width: 134,
    },
    form: {
        width: "100%",
        paddingHorizontal: 16,
        gap: 7,
        marginTop: 42
    },
    content: {
        flex: 1,
        width: "100%",
        backgroundColor: colors.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 32,
        padding: 24,
        marginTop: 24
    },
    header: {
        width: "100%",
        flexDirection: "row",
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray200,
        paddingBottom: 12
    },
    clearButton: {
        marginLeft: "auto"
    },
    clearText: {
        fontSize: 12,
        color: colors.gray400,
        fontWeight: 600
    },
    separator: {
        width: "100%",
        height: 1,
        backgroundColor: colors.gray100,
        marginVertical: 16,
    },
    listContent: {
        paddingTop: 24,
        paddingBottom: 62
    },
    empty: {
        fontSize: 14,
        color: colors.gray500,
        textAlign: "center"
    }
})