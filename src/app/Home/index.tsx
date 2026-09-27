import {
  Alert,
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";
import { useState, useEffect } from "react";
import { ItemStorage, itemsStorage } from "@/storage/itemsStorage";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ItemStorage[]>([]);

  async function handleAddItem() {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe uma descrição");
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    };

    try {
      await itemsStorage.add(newItem);
      await itemsByStatus();

      Alert.alert("Adicionado", `Adicionado ${description}`);
      setDescription("");
      setFilter(FilterStatus.PENDING);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível adicionar o item.");
    }
  }

  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id);
      await itemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover", "Não foi possível remover o item.");
    }
  }

  async function itemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter);
      setItems(response);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível filtrar os itens.");
    }
  }

  function handleClear() {
    if (Platform.OS === "web") {
      if (window.confirm("Tem certeza que deseja limpar a lista?")) {
        onClear();
      }
      return;
    }

    Alert.alert("Limpar", "Tem certeza que deseja limpar a lista?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => onClear(),
      },
    ]);
  }

  async function onClear() {
    try {
      await itemsStorage.clear();
      setItems([]);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível limpar a lista.");
    }
  }

  async function handleToggleItemStatus(id: string) {
    try {
      await itemsStorage.toggleStatus(id);
      await itemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível atualizar o status.");
    }
  }

  useEffect(() => {
    itemsByStatus();
  }, [filter]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
          value={description}
        />
        <Button title="Adicionar" onPress={handleAddItem} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)}
            />
          ))}
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClear}
            hitSlop={10}
            accessibilityRole="button"
          >
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => handleRemove(item.id)}
              onStatus={() => handleToggleItemStatus(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum Item.</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
