import React, { Component } from 'react';
import Loading from './Loading';
import { getComments, postComment, amendVotesComment } from '../api'
import CommentsTable from './CommentsTable';

class Comments extends Component {

    state = {
        comments: [],
        isError: false,
        errorMessage: '',
        isLoading: true,
    }

    handleClick = (id, voteNum) => {
        console.log('comment handle click', id, voteNum)
        amendVotesComment(id, voteNum)
            .then(() => {
                this.setState(currentState => {
                    const updatedComments = currentState.comments.map(comment => {
                        const copyComment = { ...comment }
                        if (copyComment.comment_id === id) {
                            copyComment.votes += voteNum
                            copyComment.hasHadVote = true
                        }
                        return copyComment
                    })
                    return { comments: updatedComments }
                })
            })
    }

    submitNewComment = (commentData) => {
        const { article_id } = this.props
        commentData.username = commentData.author
        postComment(article_id, commentData)
            .then(comment => {
                this.setState(currentState => ({ comments: [comment, ...currentState.comments] })
                )
            })
            .catch(err => {
                const { response } = err
                this.setState({
                    isLoading: false,
                    isError: true,
                    errorMessage: `Comment could not be posted! ${response.status}! ${response.statusText}`
                })
            })
    }

    componentDidMount() {
        const { article_id } = this.props
        getComments(article_id)
            .then(comments => {
                this.setState({ comments, isLoading: false })
            })
            .catch(err => {
                const { response } = err
                this.setState({
                    isLoading: false,
                    isError: true,
                    errorMessage: `bad request or server error ${response.status}! ${response.statusText}`
                })
            })
    }

    sortCommentsByCreatedAt = (comments => {
        return comments.sort((a, b) => {
            let keyA = new Date(a.created_at), keyB = new Date(b.created_at);
            return (keyA > keyB) ? -1 : 1
        })
    })


    render() {
        const { comments, isLoading, isError, errorMessage } = this.state
        const sortedComments = this.sortCommentsByCreatedAt(comments)
        const columns = [
            { title: "Comment", field: 'body', filtering: false, editable: 'always' },
            { title: "Author", field: 'author', filterPlaceholder: 'username', editable: 'never', initialEditValue: 'grumpy19' },
            { title: "Created At", field: 'created_at', filtering: false, editable: 'never' },
            { title: "Votes", field: 'votes', type: 'numeric', filtering: false, editable: 'never' }]
        return (
            isLoading ? <Loading /> :
                isError ? <h1>{errorMessage}</h1> :
                    <CommentsTable
                        className='comments_table'
                        data={sortedComments}
                        columns={columns}
                        handleClick={this.handleClick}
                        submitNewComment={this.submitNewComment} />
        )
    }
}

export default Comments;