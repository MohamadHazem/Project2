const router = require("express").Router();
const {vacancyModel} = require("../models/vacancy.model")
// const Applicant = require("../models/vacancy.model")

//Multer Upload Handling
const multer = require("multer")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/')
  },
   filename: function (req, file, cb) {
       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
       console.log(file.originalname)
       const splitName = file.originalname.split(".")
       cb(null, `${file.fieldname}-${uniqueSuffix}.${splitName[splitName.length - 1]}`)
   }
})
const upload = multer({ storage: storage })


//Display vacancies publicly
router.get("/", async (req, res) => {
  try{
    const vacancys = await vacancyModel.find()
    res.render("applicant/vacancy",{vacancys});
  }catch (e) {
    console.log(e)
  }
});

//Display Application Form
router.get("/apply/:id", async (req, res) => {
  try{
    res.render("applicant/apply",{id:req.params.id});
  }catch (e) {
    console.log(e)
  }
});

//Apply Job
 router.post("/apply/:id", upload.single ('resume'), async (req, res) => {
  console.log(req.body);
  let data = {
    firstName:req.body.firstName, 
    lastName:req.body.lastName, 
    email:req.body.email, 
    phone:req.body.phone, 
    address:req.body.address, 
    resume: req.file.filename}

  try{ 
   vacancyModel.findById(req.params.id).then((applicant)=>{
    applicant.applicants.push(data)
    applicant.save()
   });
     res.redirect("/");
   }catch(e){
    console.log(e); 
    res.redirect("/");
   }
  });

  //Display search page publicly
router.get("/search", async (req, res) => {
  try{
    res.render("applicant/search");
  }catch (e) {
    console.log(e)
  }
});

  

//Search For Vacancy
 router.post("/search", async (req, res) => {
  
  try{ 
   let titleFinder = await vacancyModel.findOne({ "jobTitle" : { $regex: /req.body.jobTitle/ } });
   res.redirect("/results", {titleFinder});
   
  }catch (e) {
    console.log(e);
    res.redirect("/results");
  }
          
});

//Display results publicly
router.get("/results", async (req, res) => {
  try{
    const vacancys = await vacancyModel.find();
    titleFinder == vacansys.jobTitle;
    res.render("applicant/results",{vacancys});
  }catch (e) {
    console.log(e)
  }
});

module.exports = router;
