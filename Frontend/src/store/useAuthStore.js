import { logout } from '@/services/authAPI';
import { updateEmail, updatePassword, updateProfile } from '@/services/settingsAPI';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set,get) => ({
            user: null,
            loading: false,
            setUser: (user) => set({ user }),
            clearAuth: () => set({ user: null }),
            logout: async() => {
                await logout();
                set({ user: null })
            },
            updateProfile: async(updatedData) =>{
                set({loading:true});
                try {
                    const result = await updateProfile(updatedData);
                    if(result.success){
                        const {firstName,lastName,imageUrl} = result.user;
                        set((state)=>({user:{...state.user,firstName,lastName,imageUrl}}))
                        return true;
                    }
                    
                } catch (error) {
                    return false;
                } finally {
                    set({loading:false});
                }
            },
            updateEmail: async(newEmail) =>{
                set({loading:true});
                try {
                    const result = await updateEmail(newEmail);
                    if(result.success){
                        set((state)=>({user:{...state.user,email:newEmail}}))
                        return true;
                    }
                    
                } catch (error) {
                    return false;
                } finally {
                    set({loading:false});
                }
            },
            updatePassword: async(updatedData) =>{
                set({loading:true});
                try {
                    const result = await updatePassword(updatedData);
                    if(result.success){
                        return true;
                    }
                    
                } catch (error) {
                    return false;
                } finally {
                    set({loading:false});
                }
            }
        }),
        {
            name: "user", // 🔐 Key in localStorage
            partialize: (state) => ({ user: state.user })
        }
    )
);

export default useAuthStore;
