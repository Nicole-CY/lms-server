const courseService = require("../../service/Course/courseService");

const addCourseAsync = async(req, res) =>{
    const courseData = req.body;
    const result = await courseService.addCourseAsync(courseData);
    try{
        if(result.isSuccess){
            res.status(201).json({
                status: 201,
                data: result.data,
                message:"Course created successfully",
            })
        }else{
            res.status(400).json({
                status: 400,
                data:{},
                message: result.message,
            })
        }
    }catch(err){
        res.status(500).json({
            status: 500,
            data:{},
            message: err.message || "Internal Server Error",
        })
    }
    
}

module.exports = {
    addCourseAsync,
}