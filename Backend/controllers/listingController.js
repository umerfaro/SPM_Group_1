    const {responseUtils} = require("../utils");
    const {listingService} = require("../services");

    const listingController = {
        getListingData: async (req, res) => {
            try {
                const response = await listingService.getListingData();
                if (response.error) {
                    return responseUtils.handleFailure(res, response.error);
                }
                console.log(response.data);

                return responseUtils.handleSuccess(res, response.data, "Listing data fetched successfully");
            } catch (error) {
                console.log(error);
                return responseUtils.handleFailure(res, error);
            }
        },

        getListingDataById: async (req, res) => {
            try {
                const response = await listingService.getListingDataById(req.params.id);
                if (response.error) {
                    return responseUtils.handleFailure(res, response.error);
                }
                console.log(response.data);

                return responseUtils.handleSuccess(res, response.data, "Listing data fetched successfully");
            } catch (error) {
                console.log(error);
                return responseUtils.handleFailure(res, error);
            }
        },

        postListingData: async (req, res) => {
            try {
                const response = await listingService.postListingData(req.body);
                if (response.error) {
                    return responseUtils.handleFailure(res, response.error);
                }
                console.log(response.data);

                return responseUtils.handleSuccess(res, response.data, "Listing data posted successfully");
            } catch (error) {
                console.log(error);
                return responseUtils.handleFailure(res, error);
            }
        },

        putListingData: async (req, res) => {
            try {
                const response = await listingService.putListingData(req.body);
                if (response.error) {
                    return responseUtils.handleFailure(res, response.error);
                }
                console.log(response.data);

                return responseUtils.handleSuccess(res, response.data, "Listing data updated successfully");
            } catch (error) {
                console.log(error);
                return responseUtils.handleFailure(res, error);
            }
        },

        
        postListingData: async (req, res) => {
            try {
                const response = await listingService.postListingData(req.body);
                if (response.error) {
                    return responseUtils.handleFailure(res, response.error);
                }
                console.log(response.data);

                return responseUtils.handleSuccess(res, response.data, "Listing data posted successfully");
            } catch (error) {
                console.log(error);
                return responseUtils.handleFailure(res, error);
            }
        },
        
        getListingData: async (req, res) => {
            try {
                const { location, minPrice, maxPrice } = req.query;
                const filters = {};
        
                if (location) filters.location = location;
                if (minPrice) filters.rentalPricePerDay = { $gte: minPrice };
                if (maxPrice) filters.rentalPricePerDay = { $lte: maxPrice };
        
                const response = await listingService.getListingData(filters);
                return responseUtils.handleSuccess(res, response.data, "Filtered listing data fetched successfully");
            } catch (error) {
                return responseUtils.handleFailure(res, error);
            }
        }
        
    };