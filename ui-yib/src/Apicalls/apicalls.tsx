import axios from 'axios';

const apiBaseUrl = "http://localhost:7287/api";


export const sendOtp = async (email: string) => {
    return makeApiCalls("otp/generate", "POST", { email});
};

export const verifyOtp = async (email: string, otp: string) => {
    return makeApiCalls("otp/verify", "POST", { email, otp });
};

export const saveUser = async (email: string, password: string, username: string) => {
    return makeApiCalls("User/SaveUser", "POST", { email, password, username });
};


const API_BASE_URL = "http://localhost:7287/api/";

export const makeApiCalls = async (url: string, method: string, data: any) => {
    try {
        console.log("Calling API:", `${API_BASE_URL}${url}`);

        const response = await axios({
            url: `${API_BASE_URL}${url}`,
            method: method,
            data: JSON.stringify(data.email), // ?? Only send string directly
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("API Response:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("API Error:", error);
        alert(`Error: ${error.message}`);
        return null;
    }
};
