const Session = require("../../models/session");
const logger = require("../../common/logsetting");

const addSessionAsync = async (sessionData) => {
    try {

        if (!sessionData.courseInstanceId) {
            return { isSuccess: false, message: "courseInstanceId is required", data: null };
        }

        const newSession = await Session.create({
            courseInstanceId: sessionData.courseInstanceId,
            SessionTitle: sessionData.SessionTitle,
            SessionDescription: sessionData.SessionDescription || null,
            Order: sessionData.Order || null,
            CreatedBy: sessionData.CreatedBy,
            CreatedAt: new Date(),
        });

        return { isSuccess: true, message: "Session added successfully", data: newSession };

    } catch (err) {
        logger.error("addSessionAsync error:", err);
        return { isSuccess: false, message: "add session failed", data: null }
    }
};

/**
 * according to the session ID to extract single session
 * @param {number} sessionId - PK of Session
 * @returns {object}
 */
const getSessionByIdAsync = async (sessionId) => {
    try {
        if (!sessionId) {
            return { isSuccess: false, message: "Session ID is required", data: null };
        };

        const session = await Session.findByPk(sessionId);
        if (!session) {
            return { isSuccess: false, message: "Session not found", data: null };
        };

        return { isSuccess: false, message: "Session fetched succesfully", data: session };

    } catch (err) {
        logger.error("getSessionByIdAsync error:", err);
        return { isSuccess: false, message: "Faild to fetch session", data: null };
    }
}

/**
 * according to courseInstanceId extract all Session
 * @param {number} courseInstanceId - Course Instance ID，to find relevant Session
 * @returns {object} 
 */
const getSessionsByCourseInstanceIdAsync = async (courseInstanceId) => {
    try {
        if (!courseInstanceId) {
            return { isSuccess: false, message: "Course instance ID is required", data: [] };
        };

        const sessions = await Session.findAll({
            where: { courseInstanceId },
            order: [['Order', 'ASC']],
        });
        if (sessions.length === 0) {
            return { isSuccess: false, message: "No sessions found for this course instance", data: [] };
        };

        return { isSuccess: true, message: "Sessions fetched successfully", data: sessions };

    } catch (err) {
        logger.error("getSessionsByCourseInstanceIdAsync error:", err);
        return { isSuccess: false, message: "Failed to fetch sessions", data: [] };
    }
};

/**
 * pagenization to extra session list
 * @param {number} page - current page，default 1
 * @param {number} pageSize - the number to show session per page, default 10 
 * @returns {object}
 */
const getSessionListAsync = async (page = 1, pageSize = 10) => {
    try {
        const offset = (page - 1) * pageSize;

        const { count, rows: sessions } = await Session.findAndCountAll({
            limit: pageSize,
            offset,
            order: [['Order', 'ASC']],
        });

        return { isSuccess: true, message: "Sessions fetched successfully", data: { total: count, sessions, } };

    } catch (err) {
        logger.error("getSessionList error:", err);
        return { isSuccess: false, message: "Failed to fetch sessions", data: null };
    }
};

/**
 * Update session
 * @param {number} sessionId - ession ID that need to update
 * @param {object} sessionData - string object that need to update
 * @returns {object} 
 */
const updateSessionAsync = async (sessionId, sessionData) => {
    try {
        if (!sessionId) {
            return { isSuccess: false, message: "Session ID is required", data: null };
        };

        const session = await Session.findByPk(sessionId);
        if (!session) {
            return { isSuccess: false, message: "Session not found", date: null };
        };

        await session.update({
            SessionTitle: sessionData.SessionTitle || session.SessionTitle,
            SessionDescription: sessionData.SessionDescription || session.SessionDescription,
            Order: sessionData.Order !== undefined ? sessionData.Order : session.Order,
            UpdatedBy: sessionData.UpdateBy || session.UpdateBy,
            UpdatedAt: new Date(),
        });

        return { isSuccess: true, message: "Session updated successfully", data: session };

    } catch (err) {
        logger.error("updateSessionAsync error:", err);
        return { isSuccess: false, message: "Failed to update session", date: null };
    }
};

/**
 * Delete Session 
 * @param {number} sessionId - Session ID that need to delete
 * @returns {object} 
 */
const deleteSessionAsync = async (sessionId) => {
    try {
        if (!sessionId) {
            return { isSuccess: false, message: "Session ID is required", data: null };
        };

        const session = await Session.findByPk(sessionId);
        if (!session) {
            return { isSuccess: false, message: "Session not found", date: null };
        };

        await session.destroy();

        return { isSuccess: true, message: "Session deleted successfully", data: null };

    } catch (err) {
        logger.error("deleteSessionAsync error:", err);
        return { isSuccess: false, message: "Failed to delete session", data: null };
    }
}

module.exports = {
    addSessionAsync,
    getSessionByIdAsync,
    getSessionsByCourseInstanceIdAsync,
    getSessionListAsync,
    updateSessionAsync,
    deleteSessionAsync,
};