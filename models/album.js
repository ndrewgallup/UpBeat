import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema ({
  rTitle: {type: String, required: true},
  rating: {
    type: Number, 
    min: 1, 
    max: 10, 
    required: true
  },
  favTrack: String,
  content: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true
})
  


const albumSchema = new Schema({
  title: String,
  artist: String, 
  year: String, 
  recordLabel: String,
  reviews: [reviewSchema],
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
  
}, {
  timestamps: true
})

const Album = mongoose.model('Album', albumSchema)

export {
  Album
}