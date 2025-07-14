import { useEffect } from "react";
import { View } from "react-native";
import { IconButton, Text, Surface } from "react-native-paper";
import { useScoreStore } from "@/stores/scoreStore";

export function Timer() {
  const { timer, pauseTimer, isPaused, resumeTimer, resetTimer, tick } =
    useScoreStore();

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [tick]);

  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

  return (
    <View
      style={{
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text variant="titleLarge">{formatTime(timer)}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          icon="play"
          mode="contained-tonal"
          disabled={!isPaused}
          size={24}
          onPress={resumeTimer}
        />
        <IconButton
          icon="pause"
          mode="contained-tonal"
          disabled={isPaused}
          size={24}
          onPress={pauseTimer}
        />
        <IconButton
          icon="refresh"
          mode="contained-tonal"
          size={24}
          onPress={resetTimer}
        />
      </View>
    </View>
  );
}
