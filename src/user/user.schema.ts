import mongoose, { Schema } from 'mongoose';

export const UserSchema = new mongoose.Schema({
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true },
    role_id: { type: Schema.Types.ObjectId, ref: 'Role' },
    photo_types_id: { type: Schema.Types.ObjectId, ref: 'PhotoTypes' },
    avatar: { type: String, require: false },
    average_raiting: { type: Number, require: false, default: 0 },
    count_of_reviews: { type: Number, require: false, default: 0 },
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
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
export const getUserId = () => new UserModel()._id.toString();
export const getAllPhotographers = () => {
    return UserModel.aggregate([{
        $lookup: {
            from: 'roles',
            localField: 'role_id',
            foreignField: '_id',
            as: 'role_id'
        }
    }, {
        $match: {
            'role_id.name': 'photograph'
        }
    }]);
};
export const getAllModels = () => {
    return UserModel.aggregate([{
        $lookup: {
            from: 'roles',
            localField: 'role_id',
            foreignField: '_id',
            as: 'role_id'
        }
    }, {
        $match: {
            'role_id.name': 'model'
        }
    }]);
}
