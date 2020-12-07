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