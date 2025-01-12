import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    tel: {
      required: true,
      type: Number,
    },
    role: {
      required: false,
      type: String,
    },
    plaseLiving: {
      required: false,
      type: String,
    },
    street: {
      required: false,
      type: String,
    },
    house: {
      required: false,
      type: String,
    },
    stats: {
      required: false,
      type: String,
    },
    carModel: {
      required: false,
      type: String,
    },
    carNumber: {
      required: false,
      type: String,
    },
    carColor: {
      required: false,
      type: String,
    },
    total: {
      required: false,
      type: Number,
    },
    lastpay: {
      required: false,
      type: Number,
    },
    datepay: {
      type: Date,
      required: true,
    },
    datestop: {
      type: Date,
      required: true,
    },
  },
  {
    // Автоматическое присвоение времени создания и времени изменения
    timestamps: true,
  }
);

//если есть существующая модель пользователя, то вернуть ее, если нет, то создать
export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
