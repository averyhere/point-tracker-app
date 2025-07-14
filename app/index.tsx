import { useState } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { AddPlayerButton } from "@/components/add-player";
import { ScoreControls } from "@/components/score-controls";
import { SafeAreaView } from "react-native-safe-area-context";
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
      <TouchableWithoutFeedback onPress={handleClearSelection}>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {scoreboard.map((player, index) => (
            <PlayerCard
              isSelected={index === pointer}
              key={player.name}
              index={index}
              player={player}
            />
          ))}
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={handleClearSelection}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AddPlayerButton style={{ marginTop: 32 }}>
            Add Player
          </AddPlayerButton>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
