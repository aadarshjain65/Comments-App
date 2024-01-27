import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleIsLiked, deleteComment} = props
  const {id, name, comment, isLiked, initialClassName, date} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeTextClassName = isLiked ? 'active-like-text' : 'like-text'
  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTime = formatDistanceToNow(date)

  const onClickLikeIcon = () => {
    toggleIsLiked(id)
  }

  const onClickDeleteIcon = () => {
    deleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="profile-container">
        <p className={`profile ${initialClassName}`}> {initial} </p>
        <p className="name"> {name} </p>
        <p className="time"> {postedTime} ago </p>
      </div>
      <p className="comment"> {comment} </p>
      <div className="like-and-dlt-btn-container">
        <button className="like-btn" type="button" onClick={onClickLikeIcon}>
          <div className="like-btn-container">
            <img src={likeImageUrl} className="like-icon" alt="like" />
            <p className={likeTextClassName}> Like </p>
          </div>
        </button>
        <button
          className="delete-btn"
          type="button"
          data-testid="delete"
          onClick={onClickDeleteIcon}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
