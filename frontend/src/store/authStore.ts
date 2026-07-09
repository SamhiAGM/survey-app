import { create } from 'zustand';

interface User {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => {
    if (user && !user.name && user.firstName && user.lastName) {
      user.name = `${user.firstName} ${user.lastName}`;
    }
    set({ user, isAuthenticated: !!user });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
