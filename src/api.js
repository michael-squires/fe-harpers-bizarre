import axios from 'axios';

import { formatDate } from './utils';

const ncNewsApi = axios.create({
    baseURL: 'https://harpers-bizarre.herokuapp.com/api',
});

export const getTopics = () => {
    return ncNewsApi
        .get('/topics')
        .then(({ data }) => data.topics)
};

export const getArticles = (topic) => {
    return ncNewsApi
        .get('/articles', {
            params: { topic }
        })
        .then(({ data }) => {
            const { articles } = data;
            const dateFormattedArticles = articles.map(article => formatDate(article))
            return dateFormattedArticles
        });
};

export const getArticle = (article_id) => {
    return ncNewsApi
        .get(`/articles/${article_id}`)
        .then(({ data }) => {
            const dateFormattedArticle = formatDate(data)
            return dateFormattedArticle
        })
};

export const amendVotesArticle = (article_id, voteNum) => {
    return ncNewsApi
        .patch(`/articles/${article_id}`, { inc_votes: voteNum })
        .then(({ data }) => {
            return data.article
        });
}

export const amendVotesComment = (comment_id, voteNum) => {
    return ncNewsApi
        .patch(`/comments/${comment_id}`, { inc_votes: voteNum })
        .then(({ data }) => {
            return data.article
        });
}

export const getComments = (article_id) => {
    console.log('path', `/articles/${article_id}/comments`)
    return ncNewsApi
        .get(`/articles/${article_id}/comments`)
        .then(({ data }) => {
            const { comments } = data;
            const dateFormattedComments = comments.map(comment => formatDate(comment))
            return dateFormattedComments
        });
};

export const postComment = (article_id, commentData) => {
    return ncNewsApi
        .post(`/articles/${article_id}/comments`, commentData)
        .then(({ data }) => {
            return data.comment
        });
}

export const deleteComment = (comment_id) => {
    return ncNewsApi
        .delete(`/comments/${comment_id}`)
        .then(({ data }) => {
            return data.comment
        });
}
