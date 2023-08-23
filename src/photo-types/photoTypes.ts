import mongoose from 'mongoose';

export const PhotoTypesSchema = new mongoose.Schema({
    names: { types: String, require: true },
});

export const PhotoTypesModel = mongoose.model('PhotoTypes', PhotoTypesSchema);

export const getPhotoTypesById = (id: string) => PhotoTypesModel.findById(id);
export const addPhotoTypes = (values: Record<string, any>) => new PhotoTypesModel(values).save().then((type) => type.toObject());
export const deletePhotoTypesById = (id: string) => PhotoTypesModel.findOneAndDelete({ _id: id });
