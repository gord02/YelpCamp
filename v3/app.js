var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

// links campground for use here 
var Campground = require("./models/campgrounds");

// var Comment = require("./models/comments");
var seedDB= require("./seeds");

seedDB();

mongoose.connect(
  "mongodb://localhost:27017/yelp_camp_3", { useNewUrlParser: true, useUnifiedTopology: true });
//tells express to use body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("landing");
});
//INdex - displays all campgrounds
app.get("/campgrounds", function (req, res) {
  // Get all campgrounds fromd database
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});
//CREATE- adds new capground to database
app.post("/campgrounds", function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;

  var newCampground = { name: name, image: image, description: desc };
  // when adding new campground it is saved to DB
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log("something went worng");
      console.log(err);
    } else {
      //redirect back to camprground page
      res.redirect("/campgrounds");
    }
  });
});
// NEW- show form to create new campgrounds
app.get("/campgrounds/new", function (req, res) {
  res.render("new");
});

// SHOW- shows more info about one campground
app.get("/campgrounds/:id", function (req, res) {
  // // find the campground with provided ID
  // // findByID is a method given by mongoose
  // // console.log(`(${req.params.id})`);

  Campground.findById(req.params.id, function (err, foundcampground) {
    if (err) {
      console.log(err);
    } else {
      //render show template with that campground
      console.log(foundcampground);
      Campground.findById(req.params.id).populate('comments').exec(function (err, c) {
        if (err) {
          console.log(err);
        } else {
          console.log("Found:", c);
          res.render("show", { campground: c });
        }
      });
      // comment_id = 
      // res.render("show", { campground: foundcampground });
      // console.log(req.params.id);
    }
  });

  // poulate and execute was added to allows actuale comments to be passed into show(not just ids)
  // Campground.findById(req.params.id).populate("comments").exec(function (err, foundcampground) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Camprgound: ", foundcampground);
  //     //render show template with that campground
  //     res.render("show", { campground: foundcampground });
  //     // console.log(req.params.id);
  //   }
  // });

});


app.get("/akil", function (req, res) {
  // retirve all campgrounds from database
  Campground.find({}, function (err, dbCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      dbCampgrounds.forEach(function (eachCampground) {
        console.log(eachCampground.name + "-" + eachCampground.description);
      });
    }
  });
  // Print on screen done
  res.send("done");
});

app.listen(8000, function () {
  console.log("The yelpCamp server has started!");
});
