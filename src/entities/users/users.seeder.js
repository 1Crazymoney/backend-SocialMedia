import bcrypt from 'bcrypt';
import User from './users.model.js';

const users = [
  {
    first_name: 'John',
    last_name: 'Doe',
    user_name: 'johndoe',
    email: 'johndoe@example.com',
    password: '123456789',
    profilePicture: 'https://freeimage.host/i/dXOq0u9',
    coverPicture: 'https://freeimage.host/i/dXOqMCb',
    about: 'Software engineer and coffee lover',
  },
  {
    first_name: 'Jane',
    last_name: 'Doe',
    user_name: 'janedoe',
    email: 'janedoe@example.com',
    password: '123456789',
    profilePicture: 'https://freeimage.host/i/dXOq1je',
    coverPicture: 'https://freeimage.host/i/dXOqjaV',
    about: 'Marketing specialist and travel enthusiast',
  },
  {
    first_name: 'Bob',
    last_name: 'Smith',
    user_name: 'bobsmith',
    email: 'bobsmith@example.com',
    password: '123456789',
    profilePicture: 'https://freeimage.host/i/dXOqavS',
    coverPicture: 'https://freeimage.host/i/dXOqh3Q',
    about: 'Graphic designer and music lover',
  },
  {
    first_name: 'Alice',
    last_name: 'Johnson',
    user_name: 'alicejohnson',
    email: 'alicejohnson@example.com',
    password: '123456789',
    profilePicture: 'https://freeimage.host/i/dXOq73l',
    coverPicture: 'https://freeimage.host/i/dXOqw8B',
    about: 'Data scientist and bookworm',
  },
  {
    first_name: 'Default',
    last_name: 'User',
    user_name: 'defaultuser',
    email: 'user@user.com',
    password: '123456789',
    role: 'user',
  },
  {
    first_name: 'Admin',
    last_name: 'User',
    user_name: 'adminuser',
    email: 'admin@admin.com',
    password: '123456789',
    role: 'super_admin',
  },
];

async function seedUsers() {
  try {
    await User.deleteMany({}); // Eliminar usuarios existentes

    // Crear y guardar usuarios
    const createdUsers = await Promise.all(users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      const newUser = new User(user);
      return newUser.save();
    }));

    // Obtener los IDs de todos los usuarios
    const userIds = createdUsers.map(user => user._id);

    // Actualizar el campo followers y following de cada usuario
    await Promise.all(createdUsers.map(user => {
      return User.updateOne(
        { _id: user._id },
        { $set: { followers: userIds.filter(id => !id.equals(user._id)), following: userIds.filter(id => !id.equals(user._id)) } }
      );
    }));

    console.log('Users seeded successfully with following relationships');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

export default seedUsers;

