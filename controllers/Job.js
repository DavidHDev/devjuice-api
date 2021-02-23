const axios = require('axios');

module.exports = {

    getAll: async (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('cache-control', 'public, max-age=300');
        let location = req.query.location;
        let page = req.query.page;
        let description = req.query.description;
        let full_time = req.query.full_time;

        const url = `https://jobs.github.com/positions.json?description=${description}&location=${location}&page=${page}`;
        const jobs = await axios.get(url).then((res) => {
            return res.data;
        });
        res.status(200).json(jobs);
    }
}