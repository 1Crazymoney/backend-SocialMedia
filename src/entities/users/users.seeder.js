import bcrypt from 'bcrypt';
import User from './users.model.js';

const users = [
  {
    first_name: 'John',
    last_name: 'Doe',
    user_name: 'johndoe',
    email: 'johndoe@example.com',
    password: '123456789',
    profilePicture: 'https://i.postimg.cc/prs1MJXd/pikaso-texttoimage-35mm-film-photography-Profile-picture-of-a-middlea.jpg',
    coverPicture: 'https://i.postimg.cc/GpDNTDzM/pikaso-texttoimage-35mm-film-photography-Banner-showcasing-a-tranquil.jpg',
    about: 'Software engineer and coffee lover',
  },
  {
    first_name: 'Jane',
    last_name: 'Doe',
    user_name: 'janedoe',
    email: 'janedoe@example.com',
    password: '123456789',
    profilePicture: 'https://i.postimg.cc/5NkkPgR7/pikaso-texttoimage-35mm-film-photography-Profile-picture-of-a-young-A.jpg',
    coverPicture: 'https://i.postimg.cc/cL22Jh7g/pikaso-texttoimage-35mm-film-photography-Banner-depicting-a-vibrant-f.jpg',
    about: 'Marketing specialist and travel enthusiast',
  },
  {
    first_name: 'Bob',
    last_name: 'Smith',
    user_name: 'bobsmith',
    email: 'bobsmith@example.com',
    password: '123456789',
    profilePicture: 'https://i.postimg.cc/Nj9CZThg/pikaso-texttoimage-35mm-film-photography-Profile-picture-of-a-young-S.jpg',
    coverPicture: 'https://i.postimg.cc/jjygSbdm/pikaso-texttoimage-Banner-para-usar-como-foto-de-portada-de-una-perso.jpg',
    about: 'Graphic designer and music lover',
  },
  {
    first_name: 'Alice',
    last_name: 'Johnson',
    user_name: 'alicejohnson',
    email: 'alicejohnson@example.com',
    password: '123456789',
    profilePicture: 'https://i.postimg.cc/1XmYdjST/pikaso-texttoimage-35mm-film-photography-Fotopara-usar-como-foto-de-p.jpg',
    coverPicture: 'https://i.postimg.cc/9MtnJj6Z/pikaso-texttoimage-35mm-film-photography-Banner-showcasing-a-tranquil-1.jpg',
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

