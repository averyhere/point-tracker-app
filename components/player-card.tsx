import React from "react";
import { useState, useRef } from "react";
import { useScoreStore, type Player } from "@/stores/scoreStore";
import { View } from "react-native";
import {
  Card,
  Text,
  Button,
  IconButton,
  Portal,
  Menu,
  Avatar,
  Divider,
} from "react-native-paper";
import * as Haptics from "expo-haptics";
import { colors } from "@/theme";
import { useTheme } from "react-native-paper";

export function PlayerCard({
  player,
  index,
  isSelected = false,
}: {
  isSelected?: boolean;
  index: number;
  player: Player;
}) {
  const theme = useTheme();
  const {
    removePlayer,
    pointer,
    clearPointer,
    setPointer,
    layout,
    resetPlayerScore,
    incrementPoints,
  } = useScoreStore();
  const [showAddControls, setShowAddControls] = useState(false);
  const [showSubtractControls, setShowSubtractControls] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const playerCardRef = useRef(null);

  const handlePlayerCardPress = () => {
    console.log("handlePlayerCardPress");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPointer(player.id);
  };

  const handlePlayerCardLongPress = () => {
    setPointer(player.id);
    setShowMenu(true);
  };

  const TheCard = () => (
    <Card
      mode="elevated"
      elevation={1}
      ref={playerCardRef}
      style={{
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        elevation: isSelected ? 4 : 0,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: isSelected ? theme.colors.primary : "transparent",
      }}
      key={player.name}
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
              position: "absolute",
              bottom: -8,
              right: 0,
            }}
            onPress={() => {
              setShowMenu(true);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          />
        )}
      />
      <Card.Content>
        <View
          style={{
            width: "100%",
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <IconButton
            mode="contained-tonal"
            icon="minus"
            size={layout === "grid" ? 21 : 32}
            disabled={!isSelected}
            onPress={() => {
              incrementPoints(player.id, 1, "subtract");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          />
          <Text
            variant={layout === "grid" ? "displaySmall" : "displayLarge"}
            style={{
              textAlign: "center",
            }}
          >
            {player.points || 0}
          </Text>

          <IconButton
            mode="contained-tonal"
            icon="plus"
            size={layout === "grid" ? 21 : 32}
            disabled={!isSelected}
            onPress={() => {
              incrementPoints(player.id, 1, "add");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          />
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View
      style={{
        width: layout === "grid" ? "50%" : "100%",
        height: "auto",
        padding: 16,
      }}
    >
      <Menu
        visible={showMenu}
        onDismiss={() => {
          clearPointer();
          setShowMenu(false);
        }}
        mode="elevated"
        elevation={2}
        anchor={<TheCard />}
        contentStyle={{
          top: -64,
          left: "10%",
          width: "90%",
        }}
      >
        <Menu.Item
          onPress={() => resetPlayerScore(player.id)}
          leadingIcon="refresh"
          title="Reset"
        />
        <Menu.Item
          onPress={() => removePlayer}
          leadingIcon="trash-can"
          title="Remove"
        />
      </Menu>
    </View>
  );
}
