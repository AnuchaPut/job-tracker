import axios from "axios";
import { axiosClient } from "./axiosClient";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/users`;

export async function getCurrentUser() {
    const res = await axiosClient.get(`${API_URL}/me`);
    console.log("Current user:", res.data);

    return res.data;
}
 