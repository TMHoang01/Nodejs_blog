const { default: mongoose } = require("mongoose");
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
    name: { type: String, required: true ,maxLength: 255, default: '' },
    description: { type: String, default: '' },
    image: { type: String, maxLength: 255, default: '' },
    videoId: { type: String, maxLength: 255, default: '' },
    level: { type: String, maxLength: 255, default: 'Ez' },
    slug: { type: String, slug: 'name', unique: true, unique: true },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },

},{
    timestamps: true,
});

module.exports = mongoose.model('Course', Course);
