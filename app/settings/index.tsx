import { useState } from "react";
import { View, Keyboard } from "react-native";
import {
  Text,
  Divider,
  TextInput,
  IconButton,
  Snackbar,
  Portal,
  ToggleButton,
} from "react-native-paper";
import { useScoreStore } from "@/stores/scoreStore";
import { useHeaderHeight } from "@react-navigation/elements";
import { colors } from "@/theme";

export default function Index() {
  const headerHeight = useHeaderHeight();
  const { defaultPoints, setDefaultPoints, newGame, reset, layout, setLayout } =
    useScoreStore();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [defaultPointsField, setDefaultPointsField] = useState(
    defaultPoints.toString(),
  );

  const handleUpdateDefaultPoints = () => {
    const newDefaultPoints = parseInt(defaultPointsField);
    if (!isNaN(newDefaultPoints)) {
      setDefaultPoints(newDefaultPoints);
    }
    setShowSnackbar(true);
  };

  return (
    <View
      style={{
        marginBlockStart: headerHeight + 16,
        marginBlockEnd: 16,
      }}
    >
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
          >
            {snackbarMessage}
          </Snackbar>
        </Portal>
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
        <Text>Layout</Text>
        <View>
          <ToggleButton.Row
            onValueChange={(value) => {
              if (value === "grid" || value === "list" || value === "rotated") {
                console.log("setting layout to", value);
                setLayout(value);
                setSnackbarMessage("Layout updated");
                setShowSnackbar(true);
              }
            }}
            value={layout}
          >
            <ToggleButton
              value="grid"
              icon="view-grid"
              iconColor={colors.brightPurple}
            />
            <ToggleButton
              value="list"
              icon="view-list"
              iconColor={colors.brightPurple}
            />
            <ToggleButton
              value="rotated"
              icon="arrow-split-vertical"
              iconColor={colors.brightPurple}
            />
          </ToggleButton.Row>
        </View>
      </View>
    </View>
  );
}
