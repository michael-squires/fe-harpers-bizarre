import React, { Component } from 'react';
import { getArticle } from '../api';

class Article extends Component {

    state = {
        article: {}
    }

    componentDidMount() {
        getArticle(this.props.article_id)
            .then(article => {
                this.setState({ article })
            })
    }

    render() {
        const { article } = this.state
        return (
            <div className='article_body'>
                <p>{article.body}</p>
            </div>
        );
    }
}

export default Article;