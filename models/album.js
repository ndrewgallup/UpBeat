import mongoose from "mongoose"

const Schema = mongoose.Schema

const albumSchema = new Schema({
  title: String,
  artist: String, 
  year: String, 
  recordLabel: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const Album = mongoose.model('Album', albumSchema)

export {
  Album
}