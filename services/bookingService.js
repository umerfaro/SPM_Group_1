const axios = require("axios");
const BASE_URL = process.env.DB_MICROSERVICE_URL;
const { responseUtils } = require("../utils");

const bookingService = {
    getBookingData: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/booking`, {
                headers: {
                    // Authorization header if needed
                },
                withCredentials: true, // if we are using cookie-based sessions
            });

            return responseUtils.handleResponse(response);
        } catch (error) {
            console.log(error);
            return responseUtils.handleResponse(error.response);
        }
    },

    getBookingDataById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/booking/${id}`, {
                headers: {
                    // Authorization header if needed
                },
                withCredentials: true, // if we are using cookie-based sessions
            });

            return responseUtils.handleResponse(response);
        } catch (error) {
            console.log(error);
            return responseUtils.handleResponse(error.response);
        }
    },

    postBookingData: async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/booking`, data, {
                headers: {
                    // Authorization header if needed
                    "Content-Type": "application/json",
                },
                withCredentials: true, // if we are using cookie-based sessions
            });

            return responseUtils.handleResponse(response);
        } catch (error) {
            console.log(error);
            return responseUtils.handleResponse(error.response);
        }
    },

    putBookingData: async (data) => {
        try {
            const response = await axios.put(`${BASE_URL}/booking`, data, {
                headers: {
                    // Authorization header if needed
                    "Content-Type": "application/json",
                },
                withCredentials: true, // if we are using cookie-based sessions
            });

            return responseUtils.handleResponse(response);
        } catch (error) {
            console.log(error);
            return responseUtils.handleResponse(error.response);
        }
    },

    deleteBookingData: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/booking/${id}`, {
                headers: {
                    // Authorization header if needed
                },
                withCredentials: true, // if we are using cookie-based sessions
            });

            return responseUtils.handleResponse(response);
        } catch (error) {
            console.log(error);
            return responseUtils.handleResponse(error.response);
        }
    },
};