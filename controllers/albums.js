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
  .populate({path: 'reviews', populate: {path:'owner'}})
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
        res.redirect(`/albums/${album._id}`)
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

function newReview(req, res){
  Album.findById(req.params.id)
  .populate('owner')
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

function editReview(req, res) {
  Album.findById(req.params.id, (error, album) => {
    
    const review = album.reviews.filter(review => {
      return req.params.rid === review._id.toString()
    }) 
    
      res.render('albums/editReview', {
        album,
        review,
        title: "Edit Review"
      })
  })
}

// function updateReview(req, res) {
//   Album.findById(req.params.albumId)
//     .then (album => {
//     album.reviews.id(req.params.id) = updateReview
//     album.save()
//     .then (() => {
//       res.redirect(`/albums/${req.params._id}`)
//       })
//     })
//   }







export {
  newAlbum as new,
  create,
  index,
  show,
  edit,
  update,
  newReview,
  createReview,
  deleteReview,
  editReview,
  //updateReview,
}