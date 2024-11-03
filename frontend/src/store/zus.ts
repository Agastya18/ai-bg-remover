
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { create } from "zustand";
interface AppState {
    credit: boolean;
    url: string;
    loadCreditData: () => Promise<void>;
    setCredit: (credit: boolean) => void;
}

export const useAppStore = create<AppState >((set) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const { getToken } = useAuth();

    return {
        credit: false,
        url: url,
        setCredit: (credit: boolean) => set({ credit }),
        loadCreditData: async () => {
            try {
                const token = await getToken();
                const { data } = await axios.get(` http://localhost:4000/api/user/credits`, { headers: { token } });
                
                if (data.success) {
                    set({ credit: data.creditBalance });
                }
            } catch (error) {
                console.error("Failed to load credit data:", error);
            }
        },
    };
});

