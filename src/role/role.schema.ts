import mongoose, { Types } from 'mongoose';

const RoleSchema = new mongoose.Schema({
    name: { type: String, require: true }
});

export const RoleModel = mongoose.model('Role', RoleSchema);

export const getRole = () => RoleModel.find();
export const getRoleById = (id: string | Types.ObjectId) => RoleModel.findById(id);
export const addRole = (values: Record<string, any>) => new RoleModel(values).save().then((role) => role.toObject());