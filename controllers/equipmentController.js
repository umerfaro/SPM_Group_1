const { responseUtils } = require("../utils");
const { listingService } = require("../services");

const equipmentController = {
    getEquipmentDetails: async (req, res) => {
        try {
            const response = await listingService.getEquipmentDetails();
            if (response.error) {
                return responseUtils.handleFailure(res, response.error);
            }
            console.log(response.data);

            return responseUtils.handleSuccess(res, response.data, "Equipment details fetched successfully");
        } catch (error) {
            console.log(error);
            return responseUtils.handleFailure(res, error);
        }
    },
};

module.exports = equipmentController;