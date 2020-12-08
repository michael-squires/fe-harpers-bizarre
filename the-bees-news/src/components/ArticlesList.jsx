import React, { Component } from 'react';
import { getArticles } from '../api'
import ArticlesTable from './MaterialTable'

class ArticlesList extends Component {

    state = {
        articles: [],
    }

    componentDidMount() {
        const { topic_slug } = this.props
        getArticles(topic_slug)
            .then(articles => {
                console.log(articles)
                this.setState({ articles })
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
                });
        }
    }

    render() {
        const { articles } = this.state
        const columns = [
            { title: "Title", field: 'title' },
            { title: "Author", field: 'author' },
            { title: "Comment Count", field: 'comment_count', type: 'numeric' },
            { title: "Votes", field: 'votes', type: 'numeric' }]
        return <ArticlesTable
            className='articles_table'
            data={articles}
            columns={columns} />
    }
}

export default ArticlesList;
