import mongoose from 'mongoose';
import { IPhotoParams } from './user.dto';
import { ObjectId } from 'mongodb';

export const UserSchema = new mongoose.Schema({
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true },
    role: { type: String, require: true },
    avatar: { type: String, require: false },
    photo_types: { type: Array, require: true, default: [] },
    description: { type: String, require: false, default: '' },
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
export const getUserById = (id: string) => UserModel.findOne({ _id: new ObjectId(id) });
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = async (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
export const getUserId = () => new UserModel()._id.toString();
export const getUsersByRole = (role_name: string) => UserModel.find({ role: role_name });

interface IGetUsersByFilter {
    role_name: string,
    query: IPhotoParams
}

export const getUsersByFilter = async ({role_name, query}: IGetUsersByFilter) => {
    const minNum = query.price_per_hour.shift();
    const maxNum = query.price_per_hour.pop();

    if (!query.types_of_photos) {
        if (!query.limit && !query.offset) {
            return UserModel.find({ role: role_name, price_per_hour: {
                '$gte': minNum,
                '$lte': maxNum
            }});
        }
        else {
            return UserModel.find({ role: role_name, price_per_hour: {
                '$gte': minNum,
                '$lte': maxNum
            }}).limit(query.limit || 10).skip(query.offset || 0);
        }
    }
    else {
        if (!query.limit && !query.offset) {
            return UserModel.find({ role: role_name, photo_types: {
                '$all': query.types_of_photos
            }, price_per_hour: {
                '$gte': minNum,
                '$lte': maxNum
            }});
        }
        else {
            return UserModel.find({ role: role_name, photo_types: {
                '$all': query.types_of_photos
            }, price_per_hour: {
                '$gte': minNum,
                '$lte': maxNum
            }}).limit(query.limit || 10).skip(query.offset || 0);
        }
    }
};

export const updatePhotoTypes = async (user_id: string, types: string[]) => {
    await UserModel.findByIdAndUpdate({ _id: user_id }, {
        $set: {
            'photo_types': types
        }
    })
};

export const updatePricePerHour = async(user_id: string, hour: number) => {
    await UserModel.findByIdAndUpdate({ _id: user_id }, {
        $set: {
            'price_per_hour': hour
        }
    })
};