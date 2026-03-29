import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserProfile {
  id: string;
  clerkId?: string | null;
  email: string;
  displayName: string;
  gLevel: number;
  avatarId: number;
  totalXp: number;
  currentLevel: number;
  streakDays: number;
}

interface UserState {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  updateXp: (xp: number) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateXp: (xp) =>
        set((state) => {
          if (!state.user) return state;
          const newXp = state.user.totalXp + xp;
          const newLevel = Math.floor(newXp / 100) + 1; // simplified leveling
          return {
            user: {
              ...state.user,
              totalXp: newXp,
              currentLevel: newLevel,
            },
          };
        }),
      clearUser: () => set({ user: null }),
    }),
    { name: "mathquest-user" }
  )
);
