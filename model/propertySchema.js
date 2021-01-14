const mongoose = require('mongoose');

const Schema = mongoose.Schema

var propertySchema = new Schema({
    property: "string",
    description: "string",
    userID: "string"

})

var propertyModel = mongoose.model("PROPERTIES", propertySchema)

module.exports = propertyModel
  
