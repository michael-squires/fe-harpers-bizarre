import React, { Component } from 'react';
import { getArticles } from '../api'
import ArticlesTable from './MaterialTable'

class ArticlesList extends Component {

    state = {
        articles: [],
        isError: false,
        errorMessage: '',
        isLoading: true,
    }

    componentDidMount() {
        const { topic_slug } = this.props
        getArticles(topic_slug)
            .then(articles => {
                this.setState({ articles, isLoading: false })
            })
            .catch(err => {
                const { response } = err
                this.setState({
                    isLoading: false,
                    isError: true,
                    errorMessage: `no articles found ${response.status}! ${response.statusText}`
                })
            })
    }


    componentDidUpdate(prevProps) {
        console.log('ArticlesList prevProps, this.props:', prevProps.topic_slug, this.props.topic_slug)
        const changeOfTopic = prevProps.topic_slug !== this.props.topic_slug
        if (changeOfTopic) {
            getArticles(this.props.topic_slug)
                .then(articles => {
                    console.log(articles)
                    this.setState({ articles })
                })
                .catch(err => {
                    const { response } = err
                    this.setState({
                        isLoading: false,
                        isError: true,
                        errorMessage: `no articles found ${response.status}! ${response.statusText}`
                    })
                })
        }
    }

    render() {
        const { articles, isLoading, isError, errorMessage } = this.state
        const columns = [
            { title: "Title", field: 'title' },
            { title: "Author", field: 'author' },
            { title: "Comment Count", field: 'comment_count', type: 'numeric' },
            { title: "Votes", field: 'votes', type: 'numeric' }]
        return (
            isLoading ? <div><span>🤓📖</span>Reading up!</div> :
                isError ? <h1>{errorMessage}</h1> :
                    <ArticlesTable
                        className='articles_table'
                        data={articles}
                        columns={columns} />
        )
    }
}

export default ArticlesList;
