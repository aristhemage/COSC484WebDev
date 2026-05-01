import React from 'react'
import Post from '../components/Post'

const testPost = {
    "id": 1,

    "author": "John post",
    "pfpURL": "../assets/test-post.jpg",
    "avgRating": 3.5,
    "totalRatings": 40,

    "imgURL": "../assets/test-post.jpg",
    "description": "behold, kitty.",
    "datePosted": "12-12-2012",
    "Comments": [
        {
            "username": "RockEater900",
            "text": "I eat rocks"
        },

        {
            "username": "frog",
            "text": "kitty meowww omg meowww kitty woawwwwwww kitty"
        },

        {
            "username": "meeps",
            "text": "asdasdass asdasdsa asdasd ads ads asd asd asd asd ads"
        }
    ]

};

const currUser = "bob";

export const Home = () => {
  return (
    <main className = "home-page">
      
      <div className = "container">
        <Post postData ={testPost} currUser = "Bob"/>
        <Post postData ={testPost} currUser = "Bob"/>
        <Post postData ={testPost} currUser = "Bob"/>
      </div>
    
      <aside>
        <div className="filters">
                <label htmlFor ="content-filters">Sort by: </label>
                <select id = "content-filters">
                    <option value="select">Select</option>
                    <option value="select">Most Rated</option>
                    <option value="select">Latest</option>
                    <option value="select">Oldest</option>
                </select>
            <button id = "back-to-top-btn">Back to Top</button>
        </div>
      </aside>
    </main>
  )
}
