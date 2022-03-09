import { Profile } from '../models/profile.js'

function index(req, res) {
  console.log("PROFILES")
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
      title: "The Beats"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}


export {
  index
}