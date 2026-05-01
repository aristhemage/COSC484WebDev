import React from 'react'
import Post from '../components/Post'

const testPost = {
    "id": 1,

    "author": "John poster",
    "pfpURL": "../assets/test-post.jpg",
    "avgRating": 3.5,
    "totalRatings": 40,

    "imgURL": "../assets/test-post.jpg",
    "description": "behold, kitty.",
    "datePosted": "12-12-2012",
    "Comments": [
        {
          "id":1,  
          "username": "RockEater900",
            "text": "I eat rocks"
        },

        {
          "id":2,
            "username": "frog",
            "text": "kitty meowww omg meowww kitty woawwwwwww kitty"
        },

        {
            "id":3,
            "username": "meeps",
            "text": "asdasdass asdasdsa asdasd ads ads asd asd asd asd ads"
        }
    ]

};

const testPost2 = {
    "id": 2,

    "author": "Joe Biden",
    "pfpURL": "../assets/test-post.jpg",
    "avgRating": 1.0,
    "totalRatings": 400,

    "imgURL": "../assets/test-post.jpg",
    "description": "kitty",
    "datePosted": "10-12-2012",
    "Comments": [
        {
          "id":348,  
          "username": "RockEater900",
            "text": "hello"
        },

        {
          "id":3443,
            "username": "frog",
            "text": "hello"
        },

        {
            "id":123,
            "username": "meeps",
            "text": "asdasdass asdasdsa asdasd ads ads asd asd asd asd ads"
        }
    ]

};

const posts = [testPost, testPost2];

const currUser = "bob";

export const Home = () => {
  return (
    <main className = "home-page">
      
      <div className = "container">
        {posts.map((post) => (
          <Post key = {post.id} postData ={post} currUser = {currUser}/>
        ))}
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
