const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicantSchema = new Schema({
   firstName: {
     type: String,
   },
   lastName: {
     type: String,
   },
   email: {
     type: String,
   },
   phone: {
     type: String,
   },
    address: {
      type: String,
    },
   resume: {
     type: String,
   },

 });

const vacancySchema = new Schema({
    jobTitle: {
        type: String,
      },
    salary: {
        type: String,
      },
    description: {
        type: String,
      },
    requirement: {
        type: String,
      },
    applicants: [
         applicantSchema
       ],
      
});

// As of version 4.2.0, mongoose supports single subdocuments.

// From the docs:


// var childSchema = new Schema({ name: 'string' });

// var parentSchema = new Schema({
//   // Array of subdocuments
//   children: [childSchema],
//   // Single nested subdocuments. Caveat: single nested subdocs only work
//   // in mongoose >= 4.2.0
//   child: childSchema
// });

//From StackOverflow
// There are a few ways to do this. The simplest is just this:

// var TaskSchema = new Schema({
//     name            : String,
//     lastPerformed   : Date,
//     folder          : String,
//     user            : Schema.ObjectId
// });
// // Get tasks with user id
// Task.find({user: user_id}, function(err, tasks) {...});

// // Get user from task id
// Task.findById(id, function(err, task) {
//   User.findById(task.user, function(err, user) {
//     // do stuff with user
//   }
// }

exports.vacancyModel = mongoose.model("Vacancy", vacancySchema);
// exports.applicantmodel = mongoose.model("Applicant", applicantSchema);
