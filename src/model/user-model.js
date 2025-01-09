import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  role: {
    required: false,
    type: String,
  },
});

//если есть существующая модель пользователя, то вернуть ее, если нет, то создать
export const User = mongoose.models.User ?? mongoose.model('User', userSchema);
