import React, { Component } from 'react';
import Loading from './Loading';
import { getComments, postComment, amendVotesComment, deleteComment } from '../api'

import CommentsTable from './CommentsTable';

class Comments extends Component {

    state = {
        comments: [],
        isError: false,
        errorMessage: '',
        isLoading: true,
    }

    handleClick = (id, index, voteNum) => {
        console.log('comment handle click', id, voteNum)
        amendVotesComment(id, voteNum)
            .catch(err => {
                const { response } = err
                const { comments } = this.state
                const newComments = [...comments]
                newComments[index].votes -= voteNum
                newComments[index].hasHadVote = false
                this.setState({
                    comments: newComments,
                    isLoading: false,
                    isError: true,
                    errorMessage: `Vote could not be cast! ${response.status}! ${response.statusText}`
                })
            })
    }

    submitNewComment = (commentData) => {
        const { article_id } = this.props
        commentData.username = commentData.author
        return postComment(article_id, commentData)
            .then(comment => {
                this.setState(currentState => ({ comments: [comment, ...currentState.comments] }))
                return comment
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

    handleDelete = (id) => {
        deleteComment(id)
            .catch(err => {
                const { response } = err
                this.setState({
                    isLoading: false,
                    isError: true,
                    errorMessage: `Comment could not be deleted! ${response.status}! ${response.statusText}`
                })
            })
    }

    componentDidMount() {
        const { article_id } = this.props
        console.log('article_id', article_id)
        getComments(article_id)
            .then(comments => {
                console.log('comments', comments)
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

    render() {
        console.log('rendering COMMENTS')
        const { comments, isLoading, isError, errorMessage } = this.state
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
                        data={comments}
                        columns={columns}
                        handleClick={this.handleClick}
                        submitNewComment={this.submitNewComment}
                        handleDelete={this.handleDelete} />
        )
    }
}

export default Comments;