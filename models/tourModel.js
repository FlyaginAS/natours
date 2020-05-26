const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a maxGroupSize'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a tour image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    slug: {
      type: String,
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  //option object
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
//document middleware: runs before .save() and .create()  not insertMany!!!
//this is the current document
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
//post middleware
// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

//queryMiddleware
tourSchema.pre(/^find/g, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/g, function (docs,next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});
//aggregation middleware
tourSchema.pre('aggregate', function (next) {
  this._pipeline.unshift({
    $match: { secretTour: {$ne: true}}
  });
  next();
});

module.exports = mongoose.model('Tour', tourSchema);
