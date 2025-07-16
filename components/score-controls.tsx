import { useState } from "react";
import {
  Portal,
  Modal,
  Text,
  Button,
  TextInput,
  Surface,
} from "react-native-paper";
import { View } from "react-native";
import { useScoreStore } from "@/stores/scoreStore";
import { colors } from "@/theme";

export function Controls({ onDismiss }: { onDismiss: () => void }) {
  const { scoreboard, incrementPoints, clearPointer, pointer } =
    useScoreStore();

  const [active, setActive] = useState<boolean>(true);

  return (
    <Portal>
      <View>
        <Text>Controls</Text>
      </View>
    </Portal>
  );
}
