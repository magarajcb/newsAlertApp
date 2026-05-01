const axios = require('axios');
require('dotenv').config();

const newsController = {
    getNews: async (req, res) => {
        try {
            const { category = 'technology' } = req.query;
            const response = await axios.get('https://gnews.io/api/v4/search', {
                params: {
                    q: category,
                    lang: 'en',
                    max: 12,
                    apikey: process.env.GNEWS_API_KEY
                }
            });
            return res.status(200).json({ articles: response.data.articles });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to fetch news', error: error.message });
        }
    }
};

module.exports = newsController;