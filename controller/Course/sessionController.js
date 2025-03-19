const sessionService = require("../../service/Course/sessionService");

/**
 * Add Session
 */
const addSessionAsync = async (req, res) => {
    try {
        const sessionData = req.body;
        const result = await sessionService.addSessionAsync(sessionData);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, "session created successfully", 1, 201);
        } else {
            res.sendCommonValue({}, result.message, 0, 400);
        }
    } catch (err) {
        res.sendCommonValue({}, err.message || "Internal Server Error", 0, 500);
    }
};

module.exports = {
    addSessionAsync,
}