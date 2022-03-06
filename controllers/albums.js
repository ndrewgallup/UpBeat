import { Album } from "../models/album.js"

function newAlbum(req, res) {
  res.render('albums/new', {
    title: 'Enter A New Album'
  })
}

function create(req, res) {
  for(let key in req.body) {
    if(req.body[key] === '') delete req.body[key]
  }
  const album = new Album(req.body)
  album.save(function(error){
    if (error) 
    return res.render('albums/new')
    res.redirect('/albums')
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