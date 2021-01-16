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
            const { articles } = data
            for (const article of articles) {
                article.created_at = `${article.created_at.slice(10)} ${article.created_at.slice(12, 24)}`
                //"created_at":"2018-05-30T15:59:13.341Z"
            }
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
