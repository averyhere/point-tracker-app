import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
export type Player = {
  id: string;
  name: string;
  points: number;
  status: "won" | "lost" | null;
};

export type ScoreState = {
  players: number | undefined;
  scoreboard: Player[] | [];
  pointer: string | undefined;
  timer: number;
  isPaused: boolean;
  setBoard: (board: Player[]) => void;
  setPointer: (playerId: string) => void;
  clearPointer: () => void;
  tick: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  newGame: () => void;
  reset: () => void;
  incrementPoints: (
    playerId: string,
    points: number,
    operation: "add" | "subtract",
  ) => void;
  addPlayer: (name: string) => void;
  getPlayer: (id: string) => Player | undefined;
  removePlayer: () => void;
  clearScores: () => void;
  gameStatus: "idle" | "playing" | "complete" | undefined;
  setGameStatus: (status: "idle" | "playing" | "complete") => void;
  defaultPoints: number;
  setDefaultPoints: (points: number) => void;
  resetPlayerScore: (playerId: string) => void;
  layout: "grid" | "list" | "rotated";
  setLayout: (layout: "grid" | "list" | "rotated") => void;
};

export const useScoreStore = create<ScoreState>()(
  persist(
    (set, get) => ({
      players: undefined,
      scoreboard: [],
      pointer: undefined,
      timer: 0,
      isPaused: true,
      setBoard: (scoreboard) => set({ scoreboard }),
      setPointer: (playerId) => {
        set({
          pointer: playerId,
        });
      },
      clearPointer: () => set({ pointer: undefined }),
      tick: () =>
        set((state) => (state.isPaused ? state : { timer: state.timer + 1 })),
      pauseTimer: () => set({ isPaused: true }),
      resumeTimer: () => set({ isPaused: false }),
      resetTimer: () => set({ isPaused: true, timer: 0 }),
      defaultPoints: 50,
      setDefaultPoints: (points) => set({ defaultPoints: points }),
      newGame: () => {
        set({
          players: undefined,
          scoreboard: [],
          timer: 0,
          pointer: undefined,
          isPaused: true,
          gameStatus: "idle",
        });
      },
      reset: () => {
        set((state) => ({
          scoreboard: state.scoreboard.map((player: Player) => ({
            ...player,
            points: state.defaultPoints,
          })),
          timer: 0,
          isPaused: true,
          gameStatus: "idle",
        }));
      },
      incrementPoints: (
        playerId: string,
        points: number,
        operation: "add" | "subtract",
      ) => {
        set((state) => {
          const playerIndex = state.scoreboard.findIndex(
            (player) => player.id === playerId,
          );
          if (playerIndex === -1) return {};

          if (operation === "add") {
            state.scoreboard[playerIndex].points =
              state.scoreboard[playerIndex].points + points;
          } else if (operation === "subtract") {
            state.scoreboard[playerIndex].points =
              state.scoreboard[playerIndex].points - points;
          }
          return {};
        });
      },
      addPlayer: (name: string) => {
        set((state) => {
          if (typeof state.scoreboard === "undefined") state.scoreboard = [];
          return {
            scoreboard: [
              ...state.scoreboard,
              {
                id: uuid.v4(),
                name: name,
                points: state.defaultPoints,
                status: null,
              },
            ],
          };
        });
      },
      removePlayer: () => {
        set((state) => {
          const updated = state.scoreboard!.filter(
            (item) => item.id !== state.pointer,
          );
          return {
            scoreboard: updated,
            pointer: undefined,
          };
        });
      },
      resetPlayerScore: (playerId: string) => {
        set((state) => {
          const playerIndex = state.scoreboard.findIndex(
            (player) => player.id === playerId,
          );
          if (playerIndex === -1) return {};

          state.scoreboard[playerIndex].points = state.defaultPoints;
          return {};
        });
      },
      clearScores: () => {},
      gameStatus: "idle",
      setGameStatus: (status: "idle" | "playing" | "complete") =>
        set({ gameStatus: status }),
      layout: "grid",
      setLayout: (layout: "grid" | "list" | "rotated") => set({ layout }),
      getPlayer: (id: string) =>
        get().scoreboard.find((player) => player.id === id),
    }),
    {
      name: "ahscore-game", // key in localStorage
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
