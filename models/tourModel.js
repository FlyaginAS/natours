const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal 40 characters'],
      minlength: [10, 'A tour name must have more or equal 10 characters'],
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
      enum: {
        values: ['easy', 'medium', 'difficulty'],
        message: 'difficulty must be  easy or medium or difficulty',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
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
    startLocation: {
      //GeoJSON embeded object, not schemaType object!!!
      type:{
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type:{
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates:[Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
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
    $match: { secretTour: { $ne: true }}
  });
  next();
});

module.exports = mongoose.model('Tour', tourSchema);
