import React from 'react'
import { NavLink } from 'react-router-dom'
import image from '../assets/test-post.jpg';
import Rating from './Rating';
import Comment from './Comment';

const Post = ({postData, currUser}) => {
  return (
    <div className='post' id = {postData.id}>
        <section className="post-header">
            <div className = "user-info">
                <img src = {image} className = "profilePic" />
                <a href = "/profile" className = "username">{postData.author}</a>
            </div>
            <p className = "light-gray">
                    <span className = "avg-rating bold" title = "Average Rating">{postData.avgRating}</span>
                    <span className = "num-ratings" title = "Total Ratings"> ({postData.totalRatings})</span>
                    <i className="fa-solid fa-star"></i>
            </p>
        </section>
        <section className="post-content">
            <img className = "post-image" src = {image}></img>
            <p className="post-description">{postData.description}</p>

            <Rating/>

            <section className="post-footer">
                <p className = "light-gray post-date">Posted: {postData.datePosted}</p>
                <button className = "open-comments-btn"></button>
            </section>

            <section className="collapsible-comments">
                <form method="POST" action ="" className = "comment">
                    <label>
                        <a className = "username" href="/profile">{currUser}</a>:
                        <textarea className = "comment-box" placeholder = "Leave a comment..."></textarea>
                    </label>
                    <button className = "post-comment-btn" type = "submit">Post</button>
                </form>

                {postData.Comments.map((comment) => (
                    <Comment username = {comment.username} text = {comment.text}/>
                ))}
            </section>
        </section>




    </div>
  )
}

export default Post