const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  savedJobs: [
    {
      _id: false,
      jobId: {
        type: String,
        required: true,
      },
      jobStatus: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: false,
      },
      title: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        required: false,
      },
      company: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
  ],
});

module.exports = mongoose.model("Job", JobSchema);
