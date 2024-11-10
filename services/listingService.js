const axios = require("axios");
const BASE_URL = process.env.DB_MICROSERVICE_URL;
const { responseUtils } = require("../utils");

const listingService = {
    getListingData: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/listing`, {
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

    getListingDataById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/listing/${id}`, {
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

    postListingData: async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/listing`, data, {
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

    getEquipmentDetails: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/equipment`, {
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

module.exports = listingService;