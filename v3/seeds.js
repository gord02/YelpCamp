var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
  {
    name: "cloud's Rest",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.travelvoice.jp%2Fenglish%2Fwacoal-the-japans-leading-underwear-maker-launches-a-lodging-service-in-kyoto-renovating-traditional-houses&psig=AOvVaw2clC5wtJ_HzyFXtE3k5-Pq&ust=1592764864937000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNDBwtaFkeoCFQAAAAAdAAAAABAI",
    description: "nice spa vacation",
  },
  {
    name: "Night Fall",
    image: "https://wallpaperaccess.com/full/179000.jpg",
    description: "peacefu; street area",
  },
  {
    name: "Canyon Blues",
    image:
      "https://jameskaiser.com/wp-content/uploads/2016/07/grand-canyon-river-trip-camping.jpg",
    description: "peaceful street area",
  },
];

function seedDB() {
  //   removes ALL CAMPGROUNDS
  Campground.remove({}, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("Removed all Campgrounds");
    // adds a few campgrounds
    data.forEach(function (seed) {
      Campground.create(seed, function (err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          // create comment
          Comment.create(
            {
              text: "This place is great, but I wish there was interent",
              author: "Homer",
            },
            function (err, comment) {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                // console.log("Camprgorund:", campground);
                campground.save();
                // console.log("Created new comment");
              }
            }
          );
        }
      });
    });
  });

  // adds a few comments
}
// this sends function(seedDB) out to be imported by other files
module.exports = seedDB;
