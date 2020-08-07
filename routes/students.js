var express = require('express');
var router = express.Router();

var data=[]

function createId(){
  return data.length
}

router.get('/', (req, res)=>{
  res.send({
    "Students list": data
  })
})

router.get('/:id', (req, res)=>{
  var curr_user
  var param=req.params
  data.forEach(user=>{
    if (user.id==param.id){
      curr_user=user
    }
  })
  res.send(curr_user)
})

router.post('/', (req,res)=>{
  new_user={"id":createId(),...req.body}
  data.push(new_user)
  res.send("Student registered")
})

router.put('/:id', (req,res)=>{
  var param=req.params
  var index=-1
  for (i=0; i<data.length; i++){
    if (data[i].id==param.id) {
      index = i
      data[i].name = req.body.name
    }
  }
  if (index !==-1){
    res.send("Student Updated")
  }else{
    res.send("Student not found!")
  }
})

router.delete('/:id', (req,res)=>{
  var param=req.params
  var index=-1
  for (i=0; i<data.length; i++){
    if (data[i].id==param.id){
      index=i
    }
  }
  if (index!==-1){
    data.splice(index,1)
    res.send("Student deleted")
  }else{
    res.send("Student does not exist")
  }

})

module.exports = router;
