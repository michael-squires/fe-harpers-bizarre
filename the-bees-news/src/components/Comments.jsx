import React, { Component } from 'react';
import Loading from './Loading';
import { getComments } from '../api'
import CommentsTable from './CommentsTable';


class Comments extends Component {

    state = {
        comments: [],
        isError: false,
        errorMessage: '',
        isLoading: true,
    }

    handleClick = (id) => {
        console.log(id)
        //todo later
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

    render() {
        const { comments, isLoading, isError, errorMessage } = this.state
        const columns = [
            { title: "Comment", field: 'body' },
            { title: "Author", field: 'author' },
            { title: "Created At", field: 'created_at' },
            { title: "Votes", field: 'votes', type: 'numeric' }]
        return (
            isLoading ? <Loading /> :
                isError ? <h1>{errorMessage}</h1> :
                    <CommentsTable
                        className='comments_table'
                        data={comments}
                        columns={columns}
                        handleClick={this.handleClick} />
        )
    }
}

export default Comments;