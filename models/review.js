import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  rTitle: {type: String, required: true},
  favTracks: String,
  review: {type: String, required: true},
}, {
  timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

export {
  Review
}