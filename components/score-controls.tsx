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

export function ScoreControls({ onDismiss }: { onDismiss: () => void }) {
  const { scoreboard, incrementPoints, clearPointer, pointer } =
    useScoreStore();

  const [active, setActive] = useState<boolean>(true);

  const handleDismiss = () => {
    clearPointer();
    setActive(false);
    onDismiss();
  };

  return (
    <Portal>
      <Surface
        elevation={4}
        style={{
          position: "absolute",
          top: "auto",
          bottom: "20%",
          left: 32,
          right: 32,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          padding: 16,
          borderRadius: 16,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Button
            mode="contained-tonal"
            onPress={() => incrementPoints(pointer!, 1, "subtract")}
          >
            -1
          </Button>
          <Button
            mode="contained-tonal"
            onPress={() => incrementPoints(pointer!, 5, "subtract")}
          >
            -5
          </Button>
          <Button
            mode="contained-tonal"
            onPress={() => incrementPoints(pointer!, 10, "subtract")}
          >
            -10
          </Button>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Button
            mode="contained-tonal"
            onPress={() => incrementPoints(pointer!, 1, "add")}
          >
            +1
          </Button>
          <Button
            mode="contained-tonal"
            onPress={() => incrementPoints(pointer!, 5, "add")}
          >
            +5
          </Button>
          <Button
            mode="contained-tonal"
            onPress={() => incrementPoints(pointer!, 10, "add")}
          >
            +10
          </Button>
        </View>
      </Surface>
    </Portal>
  );
}
