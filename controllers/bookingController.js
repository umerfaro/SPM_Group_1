const {responseUtils} = require("../utils");
const {bookingService} = require("../services");

const bookingController = {
    getBookingData: async (req, res) => {
        try {
            const response = await bookingService.getBookingData();
            if (response.error) {
                return responseUtils.handleFailure(res, response.error);
            }
            console.log(response.data);

            return responseUtils.handleSuccess(res, response.data, "Booking data fetched successfully");
        } catch (error) {
            console.log(error);
            return responseUtils.handleFailure(res, error);
        }
    },

    getBookingDataById: async (req, res) => {
        try {
            const response = await bookingService.getBookingDataById(req.params.id);
            if (response.error) {
                return responseUtils.handleFailure(res, response.error);
            }
            console.log(response.data);

            return responseUtils.handleSuccess(res, response.data, "Booking data fetched successfully");
        } catch (error) {
            console.log(error);
            return responseUtils.handleFailure(res, error);
        }
    },

    postBookingData: async (req, res) => {
        try {
            const response = await bookingService.postBookingData(req.body);
            if (response.error) {
                return responseUtils.handleFailure(res, response.error);
            }
            console.log(response.data);

            return responseUtils.handleSuccess(res, response.data, "Booking data posted successfully");
        } catch (error) {
            console.log(error);
            return responseUtils.handleFailure(res, error);
        }
    },

    putBookingData: async (req, res) => {
        try {
            const response = await bookingService.putBookingData(req.body);
            if (response.error) {
                return responseUtils.handleFailure(res, response.error);
            }
            console.log(response.data);

            return responseUtils.handleSuccess(res, response.data, "Booking data updated successfully");
        } catch (error) {
            console.log(error);
            return responseUtils.handleFailure(res, error);
        }
    },
};