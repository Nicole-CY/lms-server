const Session = require("../../models/session");
const logger = require("../../common/logSetting");

const addSessionAsync = async (sessionData) => {
    try {

        if (!sessionData.courseId) {
            return { isSuccess: false, message: "courseId is required", data: null };
        }

        const newSession = await Session.create({
            courseId: sessionData.courseId,
            SessionTitle: sessionData.SessionTitle,
            SessionDescription: sessionData.SessionDescription || null,
            Order: sessionData.Order || null,
        });

        return { isSuccess: true, message: "Session added successfully", data: newSession };

    } catch (err) {
        logger.error("addSessionAsync error:", err);
        return { isSuccess: false, message: "add session failed", data: null }
    }
};

module.exports = {
    addSessionAsync,
};