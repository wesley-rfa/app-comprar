import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { StatusIcon } from "../StatusIcon";
import { FilterStatus } from "@/types/FilterStatus";
import { ItemStorage } from "@/storage/itemsStorage";
import { colors } from "@/theme/colors";
import { Trash2 } from "lucide-react-native";

type Props = {
  data: ItemStorage;
  onRemove: () => void,
  onStatus: () => void
};

export function Item({ data, onStatus, onRemove }: Props) {
  const isDone = data.status === FilterStatus.DONE;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onStatus}
        hitSlop={10}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isDone }}
        accessibilityLabel={`Marcar ${data.description} como ${isDone ? "pendente" : "comprado"}`}
      >
        <StatusIcon status={data.status} />
      </TouchableOpacity>
      <Text style={styles.description}>{data.description}</Text>
      <TouchableOpacity
        onPress={onRemove}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel={`Remover ${data.description}`}
      >
        <Trash2 size={18} color={colors.gray400} />
      </TouchableOpacity>
    </View>
  );
}
