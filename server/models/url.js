const mongoose = require('mongoose');


const urlSchema = mongoose.Schema({
    slug: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Url', urlSchema);