import React from "react";
import { useScoreStore, type Player } from "@/stores/scoreStore";
import { View } from "react-native";
import { Card, Text, IconButton, useTheme } from "react-native-paper";
import * as Haptics from "expo-haptics";

export function PlayerCard({
  player,
  isSelected = false,
  onLongPress,
  setShowMenu,
  index,
}: {
  isSelected?: boolean;
  player: Player;
  onLongPress?: () => void;
  setShowMenu?: (open: boolean) => void;
  index?: number;
}) {
  const theme = useTheme();

  const { setPointer, layout } = useScoreStore();

  const handlePlayerCardPress = () => {
    setPointer(player.id);
    setShowMenu && setShowMenu(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePlayerCardLongPress = () => {
    setPointer(player.id);
    setShowMenu && setShowMenu(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onLongPress) onLongPress();
  };

  const getRotation = (index: number) => {
    if (isNaN(index)) {
      return undefined;
    } else if (index % 2) {
      return "rotate(-90deg)";
    } else {
      return "rotate(90deg)";
    }
  };

  return (
    <View
      style={{
        width: layout === "list" ? "100%" : "50%",
        height: "auto",
        padding: 8,
      }}
    >
      <Card
        mode="elevated"
        elevation={1}
        style={{
          width: "100%",
          aspectRatio: layout === "grid" ? 1 : undefined,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          elevation: isSelected ? 4 : 0,
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: isSelected ? theme.colors.primary : "transparent",
        }}
        onPress={() => handlePlayerCardPress()}
        onLongPress={() => handlePlayerCardLongPress()}
      >
        <Card.Title
          style={{
            paddingTop: 16,
            minHeight: 0,
          }}
          title={player.name}
          titleStyle={{
            textAlign: "center",
            color: theme.colors.primary,
            padding: 0,
          }}
          titleVariant="labelLarge"
          right={() => (
            <IconButton
              icon="dots-horizontal"
              size={16}
              disabled={!isSelected}
              style={{
                opacity: isSelected ? 1 : 0,
                position: "absolute",
                bottom: -2,
                right: 2,
              }}
              onPress={() => {
                setShowMenu && setShowMenu(true);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            />
          )}
        />
        <Card.Content>
          <View
            style={{
              width: "100%",
              maxWidth: "100%",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <Text
              variant={layout === "grid" ? "displaySmall" : "displayLarge"}
              style={{
                textAlign: "center",
                fontSize: 54,
                lineHeight: 54,
              }}
            >
              {player.points || 0}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
