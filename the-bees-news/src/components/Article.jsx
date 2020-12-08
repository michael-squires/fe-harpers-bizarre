import React, { Component } from 'react';
import { getArticle } from '../api';

class Article extends Component {

    state = {
        article: {},
        isError: false,
        errorMessage: '',
        isLoading: true,
    }

    componentDidMount() {
        getArticle(this.props.article_id)
            .then(article => {
                this.setState({ article, isLoading: false })
            })
            .catch(err => {
                const { response } = err
                this.setState({
                    isLoading: false,
                    isError: true,
                    errorMessage: `no such Article ${response.status}! ${response.statusText}`
                })

            })
    }

    render() {
        const { article, isLoading, isError, errorMessage } = this.state
        return (
            isLoading ? <div><span>🤓📖</span>Reading up!</div> :
                isError ? <h1>{errorMessage}</h1> :
                    <div className='article_body'>
                        <p>{article.body}</p>
                    </div>
        );
    }
}

export default Article;