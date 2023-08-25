import mongoose, { Schema } from 'mongoose';

export const UserSchema = new mongoose.Schema({
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true },
    role: { type: String, require: true },
    avatar: { type: String, require: false },
    photo_types: { type: Array, require: true, default: [] },
    average_raiting: { type: Number, require: true, default: 0 },
    count_of_reviews: { type: Number, require: true, default: 0 },
    price_per_hour: { type: Number, require: true, default: 100 },  
    authentication: {
        pws: { type: String, require: true },
        access_token: { type: String },
        refresh_token: { type: String },
        salt: { type: String }
    },
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = async (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
export const getUserId = () => new UserModel()._id.toString();
export const getUsersByRole = (role_name: string) => UserModel.find({ role: role_name });
export const getUsersByFilter = async (role_name: string, types: string[], hour?: number[]) => {
    return UserModel.find({ role: role_name, photo_types: {
        '$all': types
    }});
};
export const updatePhotoTypes = async (user_id: string, types: string[]) => {
    await UserModel.findByIdAndUpdate({ _id: user_id }, {
        $set: {
            'photo_types': types
        }
    })
    // UserModel.updateOne({_id: user_id, {"$set": {"photo_types": types}}})
}