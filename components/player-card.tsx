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
import { ScoreControls } from "./score-controls";
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
    setPointer(index);
  };

  const handlePlayerCardLongPress = () => {
    setPointer(index);
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
          <Menu
            visible={showSubtractControls}
            onDismiss={() => setShowSubtractControls(false)}
            mode="elevated"
            elevation={2}
            contentStyle={{ borderRadius: 16, top: -32 }}
            anchor={
              <IconButton
                mode="contained-tonal"
                icon="minus"
                size={layout === "grid" ? 21 : 32}
                disabled={!isSelected}
                onPress={() => {
                  incrementPoints(player.id, 1, "subtract");
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
                onLongPress={() => {
                  setShowSubtractControls(true);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }}
              />
            }
          >
            <Text
              variant="titleMedium"
              style={{ paddingInline: 16, paddingBlockEnd: 4 }}
            >
              Subtract Points
            </Text>
            <Divider />
            <Menu.Item
              onPress={() => {
                incrementPoints(player.id, 5, "subtract");
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              leadingIcon="minus"
              title="5 points"
            />
            <Menu.Item
              onPress={() => {
                incrementPoints(player.id, 10, "subtract");
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              leadingIcon="minus"
              title="10 points"
            />
            <Menu.Item
              onPress={() => {
                incrementPoints(player.id, 15, "subtract");
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              leadingIcon="minus"
              title="15 points"
            />
          </Menu>
          <Text
            variant={layout === "grid" ? "displaySmall" : "displayLarge"}
            style={{
              textAlign: "center",
            }}
          >
            {player.points || 0}
          </Text>

          <Menu
            visible={showAddControls}
            onDismiss={() => setShowAddControls(false)}
            mode="elevated"
            elevation={2}
            contentStyle={{ borderRadius: 16, top: -32 }}
            anchor={
              <IconButton
                mode="contained-tonal"
                icon="plus"
                size={layout === "grid" ? 21 : 32}
                disabled={!isSelected}
                onPress={() => {
                  incrementPoints(player.id, 1, "add");
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
                onLongPress={() => {
                  setShowAddControls(true);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }}
              />
            }
          >
            <Text
              variant="titleMedium"
              style={{ paddingInline: 16, paddingBlock: 4 }}
            >
              Add Points
            </Text>
            <Divider />
            <Menu.Item
              onPress={() => {
                incrementPoints(player.id, 5, "add");
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              leadingIcon="plus"
              title="5 points"
            />
            <Menu.Item
              onPress={() => {
                incrementPoints(player.id, 10, "add");
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              leadingIcon="plus"
              title="10 points"
            />
            <Menu.Item
              onPress={() => {
                incrementPoints(player.id, 15, "add");
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              leadingIcon="plus"
              title="15 points"
            />
          </Menu>
        </View>
      </Card.Content>
      {/* <Card.Actions
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          position: "relative",
        }}
      ></Card.Actions> */}
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
