var mongoose = require("mongoose");
 
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("Campground", campgroundSchema);



// ==========================================
// OLD VERSION 
// ==========================================
//   // Campground logic
// var mongoose = require("mongoose");
// var commentSchema = require("./comment").schema;

// //schema set up
// var campgroundsSchema = new mongoose.Schema({
//     name: String,
//     image: String,
//     description: String,
//     comments: [commentSchema],
//    // This is used to asscociate the file emebed reference
//     //commnets:[{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
//   });
//   //exports model to other files
//   module.exports = mongoose.model("Campground", campgroundsSchema);