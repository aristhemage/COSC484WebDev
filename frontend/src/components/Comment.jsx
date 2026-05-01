import React from 'react'

const Comment = ({username, text}) => {
  return (
    <div className='comment'>
        <p>
            <a className = "username" href = "/Profile">{username}</a>: 
            <span className="comment-content"> {text}</span>
        </p>
    </div>
  )
}

export default Comment