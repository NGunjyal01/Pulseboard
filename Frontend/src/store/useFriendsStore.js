// src/store/useFriendsStore.js
import { create } from "zustand";
import { getAllFriends, getIncomingRequests, getOutgoingRequests, removeFriend, sendFriendRequest } from "@/services/friendsAPI";

const useFriendsStore = create((set, get) => ({
    friends: [],
    incomingRequests: [],
    outgoingRequests: [],
    loading: false,
    error: null,
    fetched: {friends:false,incoming:false,outgoing:false},

    fetchFriends: async () => {
        if (get().fetched.friends) return;

        set({ loading: true, error: null });
        try {
            const data = await getAllFriends();
            set((state)=>({ friends: data,
                fetched: {...state.fetched, friends:true}
             }));
        } catch (err) {
            set({ error: err.message});
        } finally{
            set({loading:false});
        }
    },

    addFriend: async (emailId) => {
        set({ loading: true });
        try {
            const request = await sendFriendRequest(emailId);
            set(state=>({outgoingRequests:[...state.outgoingRequests,request]}));
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

    },
    
    // Fetch incoming requests
    fetchIncomingRequests: async () => {
        if(get().fetched.incoming) return;
        set({ loading: true });
        try {
            const data = await getIncomingRequests();
            set(state=>({ incomingRequests: data,
                fetched: {...state.fetched, incoming:true}
             }));
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    // Fetch outgoing requests
    fetchOutgoingRequests: async () => {
        if(get().fetched.outgoing)  return;
        set({ loading: true });
        try {
            const data = await getOutgoingRequests();
            set(state=>({ outgoingRequests: data,
                fetched: {...state.fetched, outgoing:true}
             }));
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useFriendsStore;
