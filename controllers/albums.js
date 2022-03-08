import { Album } from "../models/album.js"

function newAlbum(req, res) {
  res.render('albums/new', {
    title: 'Enter A New Album'
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Album.create({...req.body, owner: req.user.profile._id})
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

function edit(req, res) {
  Album.findById(req.params.id)
  .then(album => {
    res.render('albums/edit', {
      album,
      title: "Edit Details"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/albums')
  })
}

function update(req, res) {
  Album.findById(req.params.id)
  .then(album => {
    console.log(album)
    if (album.owner.equals(req.user.profile._id)) {
      album.updateOne(req.body, {new: true})
      .then(()=> {
        res.redirect('/albums')
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/albums`)
  })
}

function deleteAlbum(req, res) {
  console.log(req.params.id)
  Album.findById(req.params.id)
  .then(album => {
    if (album.owner.equals(req.user.profile._id)) {
      album.delete()
      .then(() => {
        res.redirect('/albums')
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/albums')
  })
}

function newReview(req, res){
  Album.findById(req.params.id)
  .then(album => {
    res.render('albums/reviews', {
      title: "Add Review",
      album
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/albums')
  })
}

function createReview(req, res){
  console.log('Create Review:', req.body)
  req.body.owner = req.user.profile._id
  Album.findById(req.params.id) 
  .then(album => {
    album.reviews.push(req.body)
    album.save()
  .then(album => { 
      res.redirect(`/albums/${album._id}`)
    })
  })
}

function deleteReview(req, res) {
  Album.findById(req.params.id, (error, album) => {
    album.reviews.id(req.params.rid).remove()
    album.save(err => {
      res.redirect(`/albums/${req.params.id}`)
    })
  })
}


export {
  newAlbum as new,
  create,
  index,
  show,
  edit,
  update,
  deleteAlbum as delete,
  newReview,
  createReview,
  deleteReview, 
}