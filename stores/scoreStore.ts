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
  pointer: number | undefined;
  timer: number;
  isPaused: boolean;
  setBoard: (board: Player[]) => void;
  setPointer: (playerIndex: number) => void;
  clearPointer: () => void;
  tick: () => void;
  pause: () => void;
  resume: () => void;
  newGame: () => void;
  reset: () => void;
  incrementPoints: (
    playerId: string,
    points: number,
    operation: "add" | "subtract",
  ) => void;

  addPlayer: (name: string) => void;
  removePlayer: () => void;
  clearScores: () => void;
  gameStatus: "idle" | "playing" | "complete" | undefined;
  setGameStatus: (status: "idle" | "playing" | "complete") => void;
  defaultPoints: number;
  setDefaultPoints: (points: number) => void;
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
      setPointer: (playerIndex) => {
        set({
          pointer: playerIndex,
        });
      },
      clearPointer: () => set({ pointer: undefined }),
      tick: () =>
        set((state) => (state.isPaused ? state : { timer: state.timer + 1 })),
      pause: () => set({ isPaused: true }),
      resume: () => set({ isPaused: false }),
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
            (item, index) => index !== state.pointer,
          );
          return {
            scoreboard: updated,
            pointer: undefined,
          };
        });
      },
      clearScores: () => {},
      gameStatus: "idle",
      setGameStatus: (status: "idle" | "playing" | "complete") =>
        set({ gameStatus: status }),
    }),
    {
      name: "ahscore-game", // key in localStorage
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
