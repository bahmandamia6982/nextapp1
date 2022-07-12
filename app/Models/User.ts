import mongoose  from 'mongoose';

interface IModel {
  name: String
  role?: String
  currentAge?: Number 
  age: Number
}

const Model = new mongoose.Schema<IModel>({
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ['master', 'admin', 'user'],
  },
  currentAge: {
    type: Number,
    deprecated: true,
  },
  age: { type: Number },
});

// const User = mongoose.models.User as mongoose.Model<IModel> ?? mongoose.model<IModel>('User', Model);
const User = mongoose.model<IModel>('User', Model);

export default User;
