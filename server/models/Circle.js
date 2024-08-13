const mongoose = require('mongoose');

const CircleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

module.exports = mongoose.model('Circle', CircleSchema);
