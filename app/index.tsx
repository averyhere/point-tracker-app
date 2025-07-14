import { useState } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Text, Button, Card, Surface, Divider } from "react-native-paper";
import { AddPlayerButton } from "@/components/add-player";
import { ScoreControls } from "@/components/score-controls";
import { SafeAreaView } from "react-native-safe-area-context";
import { Timer } from "@/components/timer";
import {
  useScoreStore,
  // type Player,
} from "@/stores/scoreStore";
import { PlayerCard } from "@/components/player-card";

export default function Index() {
  const { scoreboard, pointer, clearPointer } = useScoreStore();
  const handleClearSelection = () => {
    clearPointer();
  };

  if (!scoreboard.length) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AddPlayerButton>Add Player</AddPlayerButton>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={{}}>
        <TouchableWithoutFeedback onPress={handleClearSelection}>
          <View style={{ height: "100%" }}>
            <View
              style={{
                width: "100%",
                flexGrow: 1,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {scoreboard.map((player, index) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  index={index}
                  isSelected={index === pointer}
                />
              ))}
            </View>

            <Surface
              elevation={1}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
                marginInline: 16,
                padding: 8,
              }}
            >
              <Timer />
              <Divider
                style={{
                  width: 1,
                  height: 24,
                  backgroundColor: "black",
                }}
              />
              <AddPlayerButton mode="contained-tonal" elevation={0}>
                Add Player
              </AddPlayerButton>
            </Surface>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}
