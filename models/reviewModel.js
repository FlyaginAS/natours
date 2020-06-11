//review/ rating/ createdAt / ref to tour/ ref to user
const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'A review must have a text'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  //option object
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

//query middleware
reviewSchema.pre(/^find/, function(next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name',
  // }).populate({
  //   path: 'user',
  //   select: 'name photo',
  // });
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function(tourId) {
  //this = it is a model
  const stats = await this.aggregate([
    {
      $match: { tour: tourId},
    },
    {
      $group: {
        _id: '$tour',
        nRating: {$sum: 1},
        avgRating: { $avg: '$rating'},
      },
    },
  ]);
  // console.log(stats);
  if(stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 0,
    });
  }
};

reviewSchema.post('save', function() {
  //this = current review
  //this.constructor = it is a Review = model
  this.constructor.calcAverageRatings(this.tour);
});
//для апдейта и удаления мы используем findByIdAndUpdate and findByIdAndDelete
// но для них нет document middleware- we will use query middleware with hacks
reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
  console.log(this.r);
  next();
});
//при pre миддлваре у нас еще не внесены изменения в отзыв в базе.
//а нам нужен доступ к айди тура в ревью и к модели ревью- на модели мы можем вызвать статич метод
reviewSchema.post(/^findOneAnd/, async function() {
  //await this.findOne(); does not work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.tour);
});


module.exports = mongoose.model('Review', reviewSchema);


