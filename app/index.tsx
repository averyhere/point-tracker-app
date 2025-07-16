import { useState } from "react";
import { View, ScrollView } from "react-native";
import { AddPlayerButton } from "@/components/add-player";
import { Controls } from "@/components/score-controls";
import { useHeaderHeight } from "@react-navigation/elements";
import { useScoreStore } from "@/stores/scoreStore";
import { PlayerCard } from "@/components/player-card";

export default function Index() {
  const [controlDrawerOpen, setControlDrawerOpen] = useState(false);
  const headerHeight = useHeaderHeight();
  const { scoreboard, pointer, layout } = useScoreStore();

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
      <ScrollView
        style={{ height: "100%" }}
        contentContainerStyle={{
          width: "100%",
          flexGrow: 1,
          display: "flex",
          flexDirection: layout === "list" ? "column" : "row",
          flexWrap: "wrap",
          alignItems: "center",
          marginTop: headerHeight,
          paddingBottom: controlDrawerOpen ? 450 : 100,
          paddingInline: 8,
        }}
      >
        {scoreboard.map((player, index) => (
          <PlayerCard
            key={player.id}
            player={player}
            isSelected={player.id === pointer}
            onLongPress={() => setControlDrawerOpen(true)}
            setShowMenu={setControlDrawerOpen}
            index={index}
          />
        ))}
      </ScrollView>

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
      <Controls visible={controlDrawerOpen} setVisible={setControlDrawerOpen} />
    </View>
  );
}
