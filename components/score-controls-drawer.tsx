import { useCallback, useRef } from "react";
import {
  Text,
  Button,
  IconButton,
  Tooltip,
  useTheme,
} from "react-native-paper";
import { View, ScrollView } from "react-native";
import { useScoreStore } from "@/stores/scoreStore";
import * as Haptics from "expo-haptics";

import BottomDrawer, { BottomDrawerRef } from "./drawer/BottomDrawer";

export function Controls({
  visible = false,
  setVisible,
}: {
  visible?: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const {
    incrementPoints,
    clearPointer,
    defaultPoints,
    resetPlayerScore,
    pointer,
    getPlayer,
    removePlayer,
  } = useScoreStore();

  const theme = useTheme();
  const drawerRef = useRef<BottomDrawerRef>(null);
  const player = pointer ? getPlayer(pointer) : undefined;

  const handleClose = useCallback(() => {
    clearPointer();
    setVisible(false);
  }, [clearPointer, setVisible]);

  const handleButtonPress = useCallback(
    (points: number, action: "add" | "subtract") => {
      if (player) {
        incrementPoints(player.id, points, action);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    },
    [player, incrementPoints],
  );

  const handleReset = useCallback(() => {
    if (player) {
      resetPlayerScore(player.id);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [player, resetPlayerScore]);

  const quickAddPointOptions = [5, 10, 15, 20, 50, 100];

  if (!player) return null;

  return (
    <BottomDrawer
      ref={drawerRef}
      visible={visible}
      onClose={handleClose}
      drawerHeight={350}
      closeThreshold={80}
      showCloseButton={false}
      showDragHandle={true}
      backdropOpacity={0}
      springConfig={{ damping: 20, stiffness: 100 }}
    >
      <View style={{ paddingTop: 8 }}>
        <View>
          <Text
            variant="labelMedium"
            style={{
              textAlign: "center",
            }}
          >
            Player
          </Text>

          <Text
            variant="titleLarge"
            style={{
              textAlign: "center",
              color: theme.colors.primary,
              marginBottom: 16,
            }}
          >
            {player.name}
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          {/* Subtract buttons */}
          <View
            style={{ gap: 8, justifyContent: "center", alignItems: "center" }}
          >
            <IconButton
              mode="contained"
              icon="minus"
              size={48}
              onPress={() => handleButtonPress(1, "subtract")}
            />

            <ScrollView
              fadingEdgeLength={16}
              style={{
                maxHeight: 156,
              }}
            >
              <View
                style={{
                  gap: 8,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {quickAddPointOptions.map((val) => (
                  <Button
                    key={`${val}-subtract`}
                    mode="elevated"
                    icon="minus"
                    onPress={() => handleButtonPress(val, "subtract")}
                  >
                    {val}
                  </Button>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Score display and reset */}
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
              <Tooltip title={`Reset back to ${defaultPoints}`}>
                <IconButton
                  mode="contained"
                  icon="refresh"
                  onPress={handleReset}
                />
              </Tooltip>

              <Tooltip title="Remove player">
                <IconButton
                  mode="contained"
                  iconColor={theme.colors.error}
                  icon="trash-can-outline"
                  onPress={removePlayer}
                />
              </Tooltip>
            </View>
          </View>

          {/* Add buttons */}
          <View
            style={{ gap: 8, justifyContent: "center", alignItems: "center" }}
          >
            <IconButton
              mode="contained"
              icon="plus"
              size={48}
              onPress={() => handleButtonPress(1, "add")}
            />

            <ScrollView
              fadingEdgeLength={16}
              style={{
                maxHeight: 156,
              }}
            >
              <View
                style={{
                  gap: 8,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {quickAddPointOptions.map((val) => (
                  <Button
                    key={`${val}-add`}
                    mode="elevated"
                    icon="plus"
                    onPress={() => handleButtonPress(val, "add")}
                  >
                    {val}
                  </Button>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </BottomDrawer>
  );
}
