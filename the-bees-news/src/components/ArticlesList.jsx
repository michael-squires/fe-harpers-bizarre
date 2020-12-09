import React, { Component } from 'react';
import { getArticles, upVoteArticle } from '../api'
import Loading from './Loading';
import ArticlesTable from './ArticlesTable'


class ArticlesList extends Component {

    state = {
        articles: [],
        isError: false,
        errorMessage: '',
        isLoading: true,
    }

    handleClick = (id) => {
        upVoteArticle(id)
            .then(() => {
                this.setState(currentState => {
                    const updatedArticles = currentState.articles.map(article => {
                        const copyArticle = { ...article }
                        if (copyArticle.article_id === id) {
                            copyArticle.votes++
                            copyArticle.hasBeenUpvoted = true
                            console.log('copy', copyArticle)
                        }
                        return copyArticle
                    })
                    return { articles: updatedArticles }
                })
            })

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
            { title: "Title", field: 'title', filtering: false },
            { title: "Author", field: 'author', filterPlaceholder: 'username' },
            { title: "Created At", field: 'created_at', filtering: false },
            {
                title: "Comment Count", field: 'comment_count', type: 'numeric', filtering: false,
                render: rowData => <div style={{}}> {rowData.comment_count} </div>
            },
            { title: "Votes", field: 'votes', type: 'numeric', filtering: false }]
        return (
            isLoading ? <Loading /> :
                isError ? <h1>{errorMessage}</h1> :
                    <ArticlesTable
                        className='articles_table'
                        data={articles}
                        columns={columns}
                        handleClick={this.handleClick} />
        )
    }
}

//(<div style={{minWidth: data.field === "columnToChange" ? "250px" : null, paddingLeft: "10px"}}>  {rowData[data.field]}  </div>)

export default ArticlesList;
