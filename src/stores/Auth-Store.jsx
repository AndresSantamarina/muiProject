import axios from "axios";
import { create } from "zustand";

const URL_USER = import.meta.env.VITE_API_USERS;

const useAuth = create((set) => ({
  users: [],
  user: null,
  loading: false,
  error: null,

  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const { email, password } = data;
      const resp = await axios.get(`${URL_USER}`, {
        params: {
          email,
          password,
        },
      });
      if (resp.data.length === 0) {
        throw new Error("Credenciales incorrectas");
      }

      const user = resp.data[0];
      set({
        user,
        loading: false,
      });
      sessionStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  logout: () => {
    set({ user: null });
    sessionStorage.removeItem("user");
  },
  checkAuth: () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    set({ user });
    return user;
  },

  getUsers: async () => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(`${URL_USER}`);
      set({ users: resp.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getUserById: async (id) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.get(`${URL_USER}/${id}`);
      set({ user: resp.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createUser: async (newUser) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.post(`${URL_USER}`, newUser);
      set((state) => ({
        users: [...state.users, resp.data],
        loading: false,
      }));
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      return false;
    }
  },

  updateUser: async (id, updatedUser) => {
    set({ loading: true, error: null });
    try {
      const resp = await axios.put(`${URL_USER}/${id}`, updatedUser);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? resp.data : user
        ),
        user: state.user?.id === id ? resp.data : state.user,
        loading: false,
      }));
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      return false;
    }
  },

  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${URL_USER}/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useAuth;
