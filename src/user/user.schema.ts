import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true },
    role: { type: String, require: true },
    remember_me: { type: Boolean, require: true },
    authentication: {
        pws: { type: String, require: true, select: false },
        access_token: { type: String, select: false },
        refresh_token: { type: String, select: false }
    },
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
export const getUserId = () => new UserModel()._id.toString();