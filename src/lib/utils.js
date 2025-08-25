import { axiosInstance } from "./axios.config"

export const getLead = async () =>{
    const res = await axiosInstance.get('/lead/leads/68a9caf948a3582994f7442a');
    return res.data;
}
