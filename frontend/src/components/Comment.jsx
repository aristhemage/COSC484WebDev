import React from 'react'
import { Link } from 'react-router-dom'
const Comment = ({username, text}) => {
  return (
    <div className='comment'>
        <p>
            <Link className = "username" to = "/Profile">{username}</Link>: 
            <span className="comment-content"> {text}</span>
        </p>
    </div>
  )
}

export default Comment