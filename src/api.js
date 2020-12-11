import axios from 'axios';

const ncNewsApi = axios.create({
    baseURL: 'https://the-bees-news.herokuapp.com/api',
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
            return data.articles
        });
};

export const getArticle = (article_id) => {
    return ncNewsApi
        .get(`/articles/${article_id}`)
        .then(({ data }) => {
            return data.article
        });
}

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
    return ncNewsApi
        .get(`/articles/${article_id}/comments`)
        .then(({ data }) => {
            return data.comments
        });
};

export const postComment = (article_id, commentData) => {
    console.log('in api', commentData)
    return ncNewsApi
        .post(`/articles/${article_id}/comments`, commentData)
        .then(({ data }) => {
            return data.comment
        });
}