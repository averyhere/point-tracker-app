import { useState } from "react";
import {
  Portal,
  Modal,
  Text,
  Button,
  TextInput,
  IconButton,
  Surface,
  HelperText,
} from "react-native-paper";
import { View } from "react-native";
import { useScoreStore } from "@/stores/scoreStore";
import { colors } from "@/theme";
import * as Haptics from "expo-haptics";
import { TbNumber10Small } from "react-icons/tb";
import { useTheme } from "react-native-paper";

export function Controls() {
  const {
    scoreboard,
    incrementPoints,
    clearPointer,
    defaultPoints,
    resetPlayerScore,
    pointer,
    getPlayer,
  } = useScoreStore();

  const theme = useTheme();

  const [active, setActive] = useState<boolean>(true);

  const player = pointer ? getPlayer(pointer) : undefined;

  if (typeof player === "undefined") return null;

  return (
    <Portal>
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          paddingInline: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Surface
          style={{
            borderTopStartRadius: 32,
            borderTopEndRadius: 32,
            paddingInline: 16,
            paddingBlockStart: 16,
            paddingBlockEnd: 32,
            width: "100%",
          }}
          elevation={3}
        >
          <Text
            variant="labelLarge"
            style={{
              textAlign: "center",
              color: theme.colors.primary,
              marginBlockEnd: 8,
            }}
          >
            {player.name}
          </Text>
          <View
            style={{
              width: "100%",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <View style={{ gap: 8 }}>
              <IconButton
                mode="contained"
                icon="minus"
                size={48}
                onPress={() => {
                  incrementPoints(player.id, 1, "subtract");
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              />

              <Button
                mode="elevated"
                icon="minus"
                onPress={() => {
                  incrementPoints(player.id, 5, "subtract");
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                5
              </Button>
              <Button
                mode="contained-tonal"
                icon="minus"
                onPress={() => {
                  incrementPoints(player.id, 10, "subtract");
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                10
              </Button>
              <Button
                mode="contained-tonal"
                icon="minus"
                onPress={() => {
                  incrementPoints(player.id, 15, "subtract");
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                15
              </Button>
            </View>

            <View style={{ gap: 8 }}>
              <Text
                variant="displayLarge"
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 72,
                  lineHeight: 72,
                }}
              >
                {player.points || 0}
              </Text>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <IconButton
                  mode="contained-tonal"
                  icon="refresh"
                  onPress={() => {
                    resetPlayerScore(player.id);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                />
                <HelperText type="info">
                  Reset back to {defaultPoints}
                </HelperText>
              </View>
            </View>

            <View style={{ gap: 8 }}>
              <IconButton
                mode="contained"
                icon="plus"
                size={48}
                onPress={() => {
                  incrementPoints(player.id, 1, "add");
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              />

              <Button
                mode="contained-tonal"
                icon="plus"
                onPress={() => {
                  incrementPoints(player.id, 5, "add");
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                5
              </Button>
              <Button
                mode="contained-tonal"
                icon="plus"
                onPress={() => {
                  incrementPoints(player.id, 10, "add");
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                10
              </Button>
              <Button
                mode="contained-tonal"
                icon="plus"
                onPress={() => {
                  incrementPoints(player.id, 15, "add");
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                15
              </Button>
            </View>
          </View>
        </Surface>
      </View>
    </Portal>
  );
}
