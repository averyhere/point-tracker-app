import React from "react";
import { useState } from "react";
import { useScoreStore, type Player } from "@/stores/scoreStore";
import { View } from "react-native";
import {
  Card,
  Text,
  Button,
  IconButton,
  Portal,
  Menu,
  Divider,
} from "react-native-paper";
import { ScoreControls } from "./score-controls";

export function PlayerCard({
  player,
  index,
  isSelected = false,
}: {
  isSelected?: boolean;
  index: number;
  player: Player;
}) {
  const { removePlayer, pointer, setPointer, clearPointer, incrementPoints } =
    useScoreStore();
  const [showAddControls, setShowAddControls] = useState(false);
  const [showSubtractControls, setShowSubtractControls] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handlePlayerCardPress = () => {
    console.log("handlePlayerCardPress");
    setPointer(index);
  };

  // const handlePlayerCardLongPress = () => {
  //   console.log("handlePlayerCardLongPress");
  //   setPointer(index);
  //   setShowControls(true);
  // };

  return (
    <View style={{ width: "50%", height: "auto", padding: 16 }}>
      <Card
        mode="elevated"
        elevation={1}
        style={{
          width: "100%",
          justifyContent: "center",
          elevation: isSelected ? 4 : 0,
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: isSelected ? "#A41EF1" : "transparent",
        }}
        key={player.name}
        onPress={() => handlePlayerCardPress()}
        // onLongPress={() => handlePlayerCardLongPress()}
      >
        <Card.Title
          title={player.name}
          titleStyle={{
            textAlign: "center",
            color: isSelected ? "#A41EF1" : "black",
          }}
          titleVariant="bodySmall"
        />
        <Card.Content>
          <Text variant="displayLarge" style={{ textAlign: "center" }}>
            {player.points || 0}
          </Text>
        </Card.Content>
        <Card.Actions style={{ justifyContent: "center" }}>
          <Menu
            visible={showSubtractControls}
            onDismiss={() => setShowSubtractControls(false)}
            mode="elevated"
            elevation={2}
            contentStyle={{ borderRadius: 16 }}
            anchor={
              <IconButton
                mode="contained-tonal"
                icon="minus"
                size={16}
                disabled={!isSelected}
                onPress={() => incrementPoints(player.id, 1, "subtract")}
                onLongPress={() => setShowSubtractControls(true)}
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
              onPress={() => incrementPoints(player.id, 1, "subtract")}
              leadingIcon="minus"
              title="1 point"
            />
            <Menu.Item
              onPress={() => incrementPoints(player.id, 5, "subtract")}
              leadingIcon="minus"
              title="5 points"
            />
            <Menu.Item
              onPress={() => incrementPoints(player.id, 10, "subtract")}
              leadingIcon="minus"
              title="10 points"
            />
          </Menu>

          <Menu
            visible={showAddControls}
            onDismiss={() => setShowAddControls(false)}
            mode="elevated"
            elevation={2}
            contentStyle={{ borderRadius: 16 }}
            anchor={
              <IconButton
                mode="contained-tonal"
                icon="plus"
                size={16}
                disabled={!isSelected}
                onPress={() => incrementPoints(player.id, 1, "add")}
                onLongPress={() => setShowAddControls(true)}
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
              onPress={() => incrementPoints(player.id, 1, "add")}
              leadingIcon="plus"
              title="1 point"
            />
            <Menu.Item
              onPress={() => incrementPoints(player.id, 5, "add")}
              leadingIcon="plus"
              title="5 points"
            />
            <Menu.Item
              onPress={() => incrementPoints(player.id, 10, "add")}
              leadingIcon="plus"
              title="10 points"
            />
          </Menu>

          <Menu
            visible={showMenu}
            onDismiss={() => setShowMenu(false)}
            mode="elevated"
            elevation={2}
            contentStyle={{ borderRadius: 16 }}
            anchor={
              <IconButton
                mode="contained-tonal"
                icon="dots-horizontal"
                size={16}
                disabled={!isSelected}
                onPress={() => setShowMenu(true)}
              />
            }
          >
            <Menu.Item onPress={() => {}} leadingIcon="plus" title="Option 1" />
            <Menu.Item onPress={() => {}} leadingIcon="plus" title="Option 2" />
            <Menu.Item
              onPress={() => removePlayer}
              leadingIcon="trash-can"
              title="Remove"
            />
          </Menu>
        </Card.Actions>
      </Card>
      {/* {showControls && (
        <ScoreControls onDismiss={() => setShowControls(false)} />
      )} */}
    </View>
  );
}
