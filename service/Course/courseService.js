const Course = require("../../models/course");
const CourseCategory = require("../../models/courseCategory");
const logger = require("../../common/logsetting");

const addCourseAsync = async(courseData) => {
    try{
        const newCourse = await Course.create({
            title: courseData.title,
            courseCode: courseData.courseCode,
            coverImage: courseData.coverImage,
            description: courseData.description,
        });
        if(courseData.categories  && Array.isArray(courseData.categories)){
            for(let categoryId of courseData.categories){
                await CourseCategory.create({
                    courseId: newCourse.id,
                    categoryId: categoryId,
                });
            }
        }
        return {
            isSuccess: true, message: "", data: newCourse
        }
    }catch(err){
        logger.error("addCourseAsync error:", err);
        return{isSuccess: false, message: "add course failed", data: null}
    }
};

module.exports = {
    addCourseAsync,
};