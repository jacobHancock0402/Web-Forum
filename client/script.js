
import loginPage from './loginPage.js'
import viewPostsPage from './viewPostsPage.js'
import createPostPage from './createPostPage.js'
document.addEventListener('DOMContentLoaded', () =>{
let loggedIn = false
let createPost = document.getElementById("createPost")
let mainDiv = document.getElementById("mainDiv")
let submitPost = null
createPostPage()
viewPostsPage()
loginPage()
})


// viewing posts is fine now, just editing seems a little scuffed

// Should probably split my client and server side into different files

// so the delete seemingly works now. Obviously none of the visual look great but we can sort that later
// i can create post and then delete but new posts just have undefined title and body
// also i'm not adding an id to these posts. I can just do this in server i guess by making it length, as it will always be at end
// also getting a few console erros as im trying to add listeners to null posts
// so next is edit post; just load some inputs, put inside as the body and title of the posts, then have a submit button
// then also wanna be able to comment, maybe do this just in the view post bit#
// also prob wanna add in photos on the posts(i know input can take in a photo)

// code for posting a post
// try{

// 	response = await fetch(url, {
//   	method: 'POST',
//   	body: JSON.stringify({"Title" : }),
//   	headers: {
//     	'Content-Type': 'application/json'
//   	}
// })
// 	data = await response.json
// }
// catch(err)
// {
// 	console.log(err)
// }