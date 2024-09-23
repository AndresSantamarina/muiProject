import axios from "axios";
import { create } from "zustand";

const URL_USER = import.meta.env.VITE_API_USERS;

const useUsers = create((set)=>({
    users: [],
    user: null,
    loading: false,
    error: null,

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
}))

export default useUsers