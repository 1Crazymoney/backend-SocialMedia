import mongoose from 'mongoose';

const MONGO_URI = `mongodb://root:1234@127.0.0.1:27017/backend-social-media?authSource=admin`;
// mongodb://usuario:contraseña@host:puerto/nombre-de-db?authSource=admin

export const dbConnection = () => {
    console.log('Start connection');
   return mongoose.connect(
    MONGO_URI,
    {}
)
}