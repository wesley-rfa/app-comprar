import { FilterStatus } from "@/types/FilterStatus";
import { colors } from "@/theme/colors";
import { CircleCheck, CircleDashed } from "lucide-react-native";

export function StatusIcon({ status }: { status: FilterStatus }) {
  return status === FilterStatus.DONE ? (
    <CircleCheck size={18} color={colors.primary} />
  ) : (
    <CircleDashed size={18} color={colors.black} />
  );
}
