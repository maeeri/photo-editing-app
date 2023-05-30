var mongoose = require('mongoose');
var itemSchema = mongoose.Schema({
    image: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });
itemSchema.set('toJSON', {
    transform: function (document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
var Item = mongoose.model('Item', itemSchema);
module.exports = Item;
