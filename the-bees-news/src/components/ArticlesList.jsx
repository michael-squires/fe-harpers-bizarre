import React, { Component } from 'react';
import { getArticles } from '../api'

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
        return (
            <main>
                <ul>
                    {articles.map(article => (
                        <li key={article.article_id}>
                            <h2>{article.title}</h2>
                        </li>
                    ))}
                </ul>
            </main>
        );
    }
}

export default ArticlesList;