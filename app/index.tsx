import { useState } from "react";
import { View, TouchableWithoutFeedback, ScrollView } from "react-native";
import {
  Text,
  Button,
  Card,
  Surface,
  Divider,
  Portal,
} from "react-native-paper";
import { AddPlayerButton } from "@/components/add-player";
import { ScoreControls } from "@/components/score-controls";
import { SafeAreaView } from "react-native-safe-area-context";
import { Timer } from "@/components/timer";
import { useHeaderHeight } from "@react-navigation/elements";
import {
  useScoreStore,
  // type Player,
} from "@/stores/scoreStore";
import { PlayerCard } from "@/components/player-card";

export default function Index() {
  const headerHeight = useHeaderHeight();
  const { scoreboard, pointer, clearPointer, layout } = useScoreStore();
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
          marginTop: headerHeight,
        }}
      >
        <AddPlayerButton>Add Player</AddPlayerButton>
      </View>
    );
  }

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleClearSelection}>
        <ScrollView
          style={{ height: "100%" }}
          contentContainerStyle={{
            width: "100%",
            flexGrow: 1,
            display: "flex",
            flexDirection: layout === "grid" ? "row" : "column",
            flexWrap: "wrap",
            alignItems: "center",
            marginTop: headerHeight,
            paddingBottom: 100,
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
        </ScrollView>
      </TouchableWithoutFeedback>
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 36,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AddPlayerButton>Add Player</AddPlayerButton>
      </View>
    </View>
  );
}
