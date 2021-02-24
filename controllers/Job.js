const axios = require("axios");
const Job = require("../models/Job");

module.exports = {
  getAll: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("cache-control", "public, max-age=300");
    let location = req.query.location;
    let page = req.query.page;
    let description = req.query.description;

    const url = `https://jobs.github.com/positions.json?description=${description}&location=${location}&page=${page}`;
    const jobs = await axios.get(url).then((res) => {
      return res.data;
    });
    res.status(200).json(jobs);
  },

  getOne: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("cache-control", "public, max-age=300");
    const { id } = req.params;

    const url = `https://jobs.github.com/positions/${id}.json?markdown=true`;
    const job = await axios.get(url).then((res) => {
      return res.data;
    });
    res.status(200).json(job);
  },

  getByUserId: async (req, res, next) => {
    const { userId } = req.params;
    const jobs = await Job.find({userId: userId});
    res.status(200).json(jobs);
  },

  saveJob: async (req, res, next) => {
    let newSavedJob = {
      jobId: req.body.jobId,
      jobStatus: req.body.jobStatus,
      location: req.body.location,
      title: req.body.title,
      company: req.body.company,
      url: req.body.url,
      type: req.body.type,
    };

    const job = await Job.findOneAndUpdate(
      { userId: req.body.userId },
      { $addToSet: { savedJobs: newSavedJob } },
      { safe: true, upsert: true }
    ).catch((err) => {
        console.log(err);
      res.status(400).json({ error: "Could not save the job." });
    });
    res.status(201).json(job);
  },
};

// {
//     id: '3db87b9e-3bff-454e-b407-51bfc1c5e4b5',
//     userId: '60301404389b0b47f47a42fb',
// save() 
//             .catch(() => {res.status(400).json({error: 'Could not save the job.'})});
//         res.status(201).json(job);
//     jobStatus: 'Did Not Apply',
//     location: 'Research Triangle Park, NC',
//     title: 'Data Scientist',
//     type: 'Full Time',
//     company: 'Metas Solutions',
//     url: 'https://jobs.github.com/positions/3db87b9e-3bff-454e-b407-51bfc1c5e4b5'
//   }
