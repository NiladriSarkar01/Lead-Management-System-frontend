import { create } from "zustand";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios.config";

export const useLeadStore = create((set) => ({
    leads:[],
    selectedLead:{},
    meta:{},
    isLeadsLoading:false,

    setSelectedLead: (data)=> {
        set({selectedLead:data});
    },

    getLeads: async (params) => {
        console.log(params);
        const jsonString = JSON.stringify(params);
        const encodedJson = encodeURIComponent(jsonString);
        const url = `lead/leads?data=${encodedJson}`;
        console.log(url);
        

        set({isLeadsLoading: true});
        try {
            const res = await axiosInstance.get(url);
            if(res.data.success){
                set({meta: res.data.meta});
                set({leads: res.data.data});
            }else{
                toast.warn(res.data.message);
            }
            return res.data
        } catch (error) {
            toast.error(error.response.data.message);
            return {success: false, message:error.response.data.message}
        } finally{
            set({isLeadsLoading: false});
        }
    },

    createLead: async (data) =>{
        console.log(data);
        set({isLeadsLoading: true});
        try {
            const res = await axiosInstance.post("/lead/leads", data);
            if(res.data.success){
                toast.success(res.data.message);
            }else{
                toast.warn(res.data.message);
            }
            return res.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return {success: false, message:error.response.data.message};
        } finally{
            set({isLeadsLoading: false});
        }
    },

    deleteLead: async (id) => {
    set({ isLeadsLoading: true });
    try {
        const res = await axiosInstance.delete(`/lead/leads/${id}`);
        if (res.data.success) {
            set((state) => ({
                leads: state.leads.filter((lead) => lead._id !== id),
            }));
            toast.success(res.data.message);
        } else {
            toast.warn(res.data.message);
        }
        return res.data;
    } catch (error) {
        toast.error("Error deleting lead.");
        return { 
            success: false, 
            message: error.response?.data?.message || "Something went wrong" 
        };
    } finally {
        set({ isLeadsLoading: false });
    }
},

    updateLead: async (id, data) =>{
        set({isLeadsLoading: true});
        try {
            const res = await axiosInstance.put(`/lead/leads/${id}`, data);
            if(res.data.success){
                toast.success(res.data.message);
            }else{
                toast.warn(res.data.message)
            }
            return res.data;
        } catch (error) {
            toast.error("Error updating Lead.");
            return {success: false, message:error.response.data.message}
        } finally {
            set({isLeadsLoading: false})
        }
    }
}))