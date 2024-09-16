
const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const userSchema = new Schema({
    email: String,
    password: String
})

const todoSchema = new Schema({
    title: String,
    done: Boolean,
    UserId: ObjectId
})

const UserModel = mongoose.model('users', userSchema);
const todoModel = mongoose.model('todo', todoSchema);
module.exports = {
    UserModel,
    todoModel
}