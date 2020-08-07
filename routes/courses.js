var express = require('express');
var router = express.Router();

var courses=[]

function createId(){
    return courses.length
}

router.get('/', (req,res)=>{
    res.send({
        "data": courses
    })
})

router.get('/:id', (req,res)=>{
    var curr_course
    var param=req.params
    courses.forEach(course=>{
        if (course.id==param.id){
            curr_course=course
        }
    })
    res.send(curr_course)
})

router.post('/', (req,res)=>{
    new_course={"id":createId(),...req.body}
    courses.push(new_course)
    res.send("Course Added")
})

router.post('/:id/enroll', (req,res)=>{
    var student=req.body.studentId
    var curr_course
    var param=req.params
    courses.forEach(course=>{
        if (course.id==param.id){
            curr_course=1
            if (student in course["enrolledStudents"]) {
                res.send('Student already enrolled in this course!')
            }else{
                if (course["availableSlots"]>0){
                    course["availableSlots"]-=1
                    course["enrolledStudents"].push(student)
                    res.send('Student enrolled successfully')
                }else{
                    res.send('No slots available for this course!')
                }
            }
        }
    })
    if (!curr_course){
        res.send('No course found for this id!')
    }
})

router.put('/:id/deregister', (req,res)=>{
    var student=req.body.studentId
    var curr_course
    var param=req.params
    courses.forEach(course=>{
        if (course.id==param.id){
            curr_course=1
            var student_index=course["enrolledStudents"].indexOf(student)
            if (student_index !==-1){
                course["enrolledStudents"].splice(student_index,1)
                course["availableSlots"]+=1
                res.send('Student unregistered successfully')
            }else{
                res.send('No student with this id is enrolled in this course!')
            }
        }
    })
    if (!curr_course){
        res.send('No course found for this id!')
    }
})


module.exports = router;