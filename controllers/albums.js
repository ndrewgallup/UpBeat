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


function index(req, res) {
  Album.find({})
  .then(albums => {
    res.render('albums/index', {
      albums,
      title: 'All Albums',
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/albums')
  })
}

function show(req, res) {
  Album.findById(req.params.id) 
  .populate('owner')
  .then(album => {
    console.log(album)
    res.render('albums/show', {
      title: 'Album Details',
      album,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/albums')
  })
}


export {
  newAlbum as new,
  create,
  index,
  show,
}