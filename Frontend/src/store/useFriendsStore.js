// src/store/useFriendsStore.js
import { create } from "zustand";
import { getAllFriends, removeFriend, sendFriendRequest } from "@/services/friendsAPI";

const useFriendsStore = create((set, get) => ({
    friends: [],
    loading: false,
    error: null,

    fetchFriends: async () => {
        // ✅ Only fetch if we don’t already have friends in state
        if (get().friends.length > 0) return;

        set({ loading: true, error: null });
        try {
            const data = await getAllFriends();
            set({ friends: data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    addFriend: async (emailId) => {
        set({ loading: true });
        try {
            await sendFriendRequest(emailId);
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    removeFriend: async (emailId) =>{
        set({loading: true});
        try {
            await removeFriend(emailId);
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }

    }
}));

export default useFriendsStore;
