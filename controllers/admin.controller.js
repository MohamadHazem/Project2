const router = require("express").Router();
const secureUser = require("../config/securepage.config");
const {vacancyModel} = require("../models/vacancy.model");
const Admin = require("../models/admin.model")

//Display vacancies posted in Admin Dashboard
router.get("/", secureUser, async (req, res) => {
  try{
    const vacancys = await vacancyModel.find()
    res.render("admin/adminDashboard",{vacancys});
  }catch (e) {
    console.log(e)
  }
});

//Display Create Vacancy form
router.get("/createVacancy", secureUser, async (req, res) => {
  try{
    res.render("admin/createVacancy");
  }catch (e) {
    console.log(e)
  }
});

//Post or Create New Vacancy
router.post("/createVacancy", secureUser, async (req, res) => {
 console.log(req.body)
  try{
   await vacancyModel.create(req.body)
   res.redirect("/admin");
 }catch(e){
  console.log(e); 
  res.redirect("/admin");
 }
});

//Display Edit Vacancy Form
router.get("/editVacancy/:id", async (req, res) => {
  let aidee = req.params.id;
  const finding = await vacancyModel.findById(aidee);
  try{
    res.render("admin/editVacancy", {finding, aidee});
  }catch (e) {
    console.log(e)
  }
});

  //Edit Vacancy (Issue with PUT)
router.put('/editVacancy/admin/editVacancy/:id', async(req,res)=>{
  const values = req.body
  console.log(values)
  try{
    vacancyModel.findByIdAndUpdate(req.params.id, {
      jobTitle: values.jobTitle,
      salary: values.salary,
      description: values.description,
      requirement: values.requirement
  }).then(()=>{
      console.log('Updated')
      res.redirect('/admin')
  })
  }catch (e) {
    console.log(e)
  }
});


  //Display Applicants List for Position
  router.get("/applicants", secureUser, async (req, res) => {
    try{
      const vacancys = await vacancyModel.find();
      res.render("admin/applicants",{vacancys});
    }catch (e) {
      console.log(e)
    }
  });

//Display Delete Vacancy Confirmation Page
router.get("/deleteVacancy/:id", async (req, res) => {
  let aidee = req.params.id;
  const finding = await vacancyModel.findById(aidee);
  try{
    res.render("admin/deleteVacancy", {finding, aidee});
  }catch (e) {
    console.log(e)
  }
});

//Delete Vacancy (DELETE issue)
router.delete('/deleteVacancy/admin/deleteVacancy/:id', async(req,res)=>{
  await vacancyModel.findByIdAndRemove(req.params.id)
  res.redirect('/admin')
})

module.exports = router;
