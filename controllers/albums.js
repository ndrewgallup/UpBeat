import { Album } from "../models/album.js"

function newAlbum(req, res) {
  res.render('albums/new', {
    title: 'Enter A New Album'
  })
}

function create(req, res) {
  Album.create(req.body)
  .then(album => {
    res.redirect('/albums')
  })
  .catch(err => {
    console.log(err)
    res.redirect("/albums")
  })
}


export {
  newAlbum as new,
  create,
}