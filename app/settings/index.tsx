import { useState } from "react";
import { View, Keyboard } from "react-native";
import {
  Text,
  Drawer,
  Button,
  Divider,
  Icon,
  TextInput,
  IconButton,
  Snackbar,
  Portal,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { List } from "react-native-paper";
import { useScoreStore } from "@/stores/scoreStore";
import { colors } from "@/theme";

export default function Index() {
  const { defaultPoints, setDefaultPoints, newGame, reset } = useScoreStore();
  const [active, setActive] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [defaultPointsField, setDefaultPointsField] = useState(
    defaultPoints.toString(),
  );

  const handleSetDefaultPoints = () => {
    const newDefaultPoints = parseInt(defaultPointsField);
    if (!isNaN(newDefaultPoints)) {
      setDefaultPoints(newDefaultPoints);
    }
  };

  const handleUpdateDefaultPoints = () => {
    const newDefaultPoints = parseInt(defaultPointsField);
    if (!isNaN(newDefaultPoints)) {
      setDefaultPoints(newDefaultPoints);
    }
    setShowSnackbar(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View
        style={{
          paddingInline: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Icon source="cog-outline" color={colors.purple} size={92} />
        <Text variant="displayLarge" style={{ color: colors.purple }}>
          Settings
        </Text>
      </View>
      <Divider style={{ marginBlock: 16 }} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingInline: 16,
        }}
      >
        <Text>Reset all player scores</Text>
        <IconButton
          mode="contained"
          icon="refresh"
          onPress={() => {
            reset();
            setSnackbarMessage("All player scores have been reset");
            setShowSnackbar(true);
          }}
        />
      </View>
      <Divider style={{ marginBlock: 16 }} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingInline: 16,
        }}
      >
        <Text>Remove all players</Text>
        <IconButton
          mode="contained"
          icon="trash-can"
          onPress={() => {
            newGame();
            setSnackbarMessage("All players removed");
            setShowSnackbar(true);
          }}
        />
      </View>
      <Divider style={{ marginBlock: 16 }} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingInline: 16,
        }}
      >
        <View>
          <Text>Default Points</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            mode="outlined"
            inputMode="numeric"
            keyboardType="numeric"
            value={defaultPointsField}
            onChangeText={(text) => setDefaultPointsField(text)}
          />
          <IconButton
            mode="contained"
            icon="check"
            onPress={() => {
              handleUpdateDefaultPoints();
              setSnackbarMessage("Default points updated");
              setShowSnackbar(true);
              Keyboard.dismiss();
            }}
          />
        </View>
        <Portal>
          <Snackbar
            visible={showSnackbar}
            onDismiss={() => setShowSnackbar(false)}
            action={{
              label: "Undo",
              onPress: () => {
                // Do something
              },
            }}
          >
            {snackbarMessage}
          </Snackbar>
        </Portal>
      </View>
    </SafeAreaView>
  );
}
