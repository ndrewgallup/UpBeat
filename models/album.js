import mongoose from "mongoose"

const Schema = mongoose.Schema

const albumSchema = new Schema({
  title: String,
  artist: String,
  year: String,
  recordLabel: String,
})

const Album = mongoose.model('Album', albumSchema)

export {
  Album
}