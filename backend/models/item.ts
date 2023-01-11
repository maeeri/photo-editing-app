const mongoose = require('mongoose')

const itemSchema = mongoose.Schema(
  {
    image: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
