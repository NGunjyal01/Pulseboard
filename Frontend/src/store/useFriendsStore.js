// src/store/useFriendsStore.js
import { create } from "zustand";
import { acceptFriendRequest, cancelFriendRequest, getAllFriends, getIncomingRequests, getOutgoingRequests, rejectFriendRequest, removeFriend, sendFriendRequest } from "@/services/friendsAPI";

const useFriendsStore = create((set, get) => ({
    friends: [],
    incomingRequests: [],
    outgoingRequests: [],
    loading: false,
    error: null,
    fetched: {friends:false,incoming:false,outgoing:false},

    fetchFriends: async () => {
        if (get().fetched.friends) return;

        set({ loading: true });
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
            set(state=>({friends: state.friends.filter(friend => friend.email!==emailId)}))
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

    acceptRequest: async (id)=>{
        set({loading:true});
        try {
            const newFriend = await acceptFriendRequest(id);
            set(state=>({friends: [...state.friends, newFriend]}));
        } catch (err) {
            set({error: err.message})
        } finally {
            set({loading:false});
        }
    },
    
    rejectRequest: async (id)=>{
        set({loading: true});
        try {
            await rejectFriendRequest(id);
            set(state=>({incomingRequests: state.incomingRequests.filter(req => req.from._id!==id)}))
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },
    
    cancelRequest: async (id)=>{
        set({loading: true});
        try {
            await cancelFriendRequest(id);
            set(state=>({outgoingRequests: state.outgoingRequests.filter(req => req.to._id!==id)}))
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    }
}));

export default useFriendsStore;
