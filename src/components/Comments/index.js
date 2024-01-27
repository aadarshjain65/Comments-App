import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {commentsList: [], name: '', comment: ''}

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialContainerBackgroundClassName = `profile ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialContainerBackgroundClassName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(eachComment => eachComment.id !== id),
    })
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {name, comment, commentsList} = this.state
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="heading"> Comments </h1>
          <div className="add-comments-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-image"
            />
            <form className="comments-form" onSubmit={this.onAddComment}>
              <p className="description">
                {' '}
                Say something about 4.0 Technologies
              </p>
              <input
                placeholder="Your Name"
                type="text"
                className="comments-input"
                onChange={this.onChangeName}
                value={name}
              />
              <textarea
                rows="5"
                cols="30"
                placeholder="Your Comment"
                className="comments-input"
                onChange={this.onChangeComment}
                value={comment}
              />
              <button className="add-comment-btn" type="submit">
                {' '}
                Add Comment{' '}
              </button>
            </form>
          </div>
          <hr className="line-break" />
          <div className="comment-count-container">
            <p className="comment-count"> {commentsList.length} </p>
            <p className="comment-text"> Comments </p>
          </div>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
