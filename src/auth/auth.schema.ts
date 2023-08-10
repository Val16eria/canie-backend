import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
    email: {type: String, require: true},
    pws: {type: String, require: true, select: false},
    remember_me: {type: Boolean, require: true}
})

export const authModel = mongoose.model('Auth', authSchema);
