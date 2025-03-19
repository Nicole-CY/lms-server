const courseService = require("../../service/Course/courseService");

const addCourseAsync = async(req, res) =>{
    
    try{
        const courseData = req.body;
        const result = await courseService.addCourseAsync(courseData);
        if(result.isSuccess){
            res.sendCommonValue(result.data, "course created successfully", 1, 201)
        }else{
            // Even if result.data is null, send a safe fallback (like an empty object)
            res.sendCommonValue({}, result.message, 0, 400);
        }
    }catch(err){
        // result may not exist here, so use {} as a safe default
        res.sendCommonValue(result.data, err.message || "Internal Server Error", 0, 500);
    }
    
}
const getCourseAsync = async(req, res)=> {
    try{
        const title = req.query.title;
        const result = await courseService.getCourseAsync(title);
        if(result.isSuccess){
            res.sendCommonValue(result.data, "course fetched successfully", 1, 201);
        }else{
            res.sendCommonValue({}, result.message, 0, 404);
        }
    }catch(err){
        res.sendCommonValue({}, err.message || "Internal Server Error", 0, 500);
    }
}

const getCourseByCourseCodeAsync = async(req, res) => {
    try{
        const courseCode = req.query.courseCode;
        const result = await courseService.getCourseByCourseCodeAsync(courseCode);
        if(result.isSuccess){
            res.sendCommonValue(result.data, "Course fetched successfully", 1, 200);
        }else{
            res.sendCommonValue({}, result.message, 0, 404);
        }
    }catch(err){
        res.sendCommonValue({}, err.message || "Internal Server Error", 0, 500);
    }

}

const getCourseByIdAsync = async(req, res) => {
    try{
        const courseId = req.query.id;
        const result = await courseService(courseId);
        if(result.isSuccess){
            res.sendCommonValue(result.data, "Course fetched successfully", 1, 200);
        }else{
            res.sendCommonValue({}, result.message, 0, 404);
        }
    }catch(err){
        res.sendCommonValue({}, err.message || "Internal Server Error", 0, 500);
    }
}

const getCourseListAsync = async(req, res) => {
    try{
        const page = parseInt(req.params.page);
        const pageSize = parseInt(req.params.pageSize);
        const result = await courseService.getCourseListAsync(page, pageSize);
        if(result.isSuccess){
            res.sendCommonValue(result.data, "Courses fetched successfully", 1, 200);
        }else{
            res.sendCommonValue([], result.message, 0, 404);
        }
    }catch(err){
        res.sendCommonValue([], err.message || "Internal Server Error", 0, 500);
    }
}

const updateCourseAsync= async(req, res) => {
    try{
        const courseData = req.body;
        const courseId = req.body.id;
        const courseCode = req.body.courseCode;
        const result = await courseService.updateCourseAsync(courseData, courseId, courseCode);
        if(result.isSuccess){
            res.sendCommonValue(result.data, "course updated successfully", 1, 200);
        }else{
            res.sendCommonValue({}, result.message, 0, 400);
        }
    }catch(err){
        res.sendCommonValue({}, err.message || "Internal Server Error", 0, 500);
    }
}

const deleteCourseAsync = async(req, res) => {
    try{
        const courseId = req.params.id;
        const result = await courseService.deleteCourseAsync(courseId);
        if(result.isSuccess){
            res.sendCommonValue(result.data, "course deleted successfully", 1, 200);
        }else{
            res.sendCommonValue({}, result.message, 0, 400);
        }
    }catch(err){
        res.sendCommonValue({}, err.message || "Internal Server Error", 0, 500);
    }
}

const bulkDeleteCoursesAsync = async(req, res) => {
    try{
        const ids = req.body.ids;
        const result = await courseService.bulkDeleteCourseAsync(ids);
        if(result.isSuccess){
            res.sendCommonValue({},"Courses deleted successfully", 1, 200);
        }else{
            res.sendCommonValue({}, result.message, 0, 400);
        }
    }catch(err){
        res.sendCommonValue({}, err.message || "Internal Server Error", 0, 500);
    }
}
module.exports = {
    addCourseAsync,
    getCourseAsync,
    getCourseByCourseCodeAsync,
    getCourseByIdAsync,
    getCourseListAsync,
    updateCourseAsync,
    deleteCourseAsync,
    bulkDeleteCoursesAsync,

}