const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    key: {type: String},
    value: {type: Number}
})


module.exports = mongoose.model('notes',notesSchema);