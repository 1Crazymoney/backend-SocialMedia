import bcrypt from 'bcrypt';
import User from './users.model.js';

const users = [
  {
    first_name: 'John',
    last_name: 'Doe',
    user_name: 'johndoe',
    email: 'johndoe@example.com',
    password: 'password123',
    profilePicture: 'https://freeimage.host/i/dXOq0u9',
    coverPicture: 'https://freeimage.host/i/dXOqMCb',
    about: 'Software engineer and coffee lover',
  },
  {
    first_name: 'Jane',
    last_name: 'Doe',
    user_name: 'janedoe',
    email: 'janedoe@example.com',
    password: 'password123',
    profilePicture: 'https://freeimage.host/i/dXOq1je',
    coverPicture: 'https://freeimage.host/i/dXOqjaV',
    about: 'Marketing specialist and travel enthusiast',
  },
  {
    first_name: 'Bob',
    last_name: 'Smith',
    user_name: 'bobsmith',
    email: 'bobsmith@example.com',
    password: 'password123',
    profilePicture: 'https://freeimage.host/i/dXOqavS',
    coverPicture: 'https://freeimage.host/i/dXOqh3Q',
    about: 'Graphic designer and music lover',
  },
  {
    first_name: 'Alice',
    last_name: 'Johnson',
    user_name: 'alicejohnson',
    email: 'alicejohnson@example.com',
    password: 'password123',
    profilePicture: 'https://freeimage.host/i/dXOq73l',
    coverPicture: 'https://freeimage.host/i/dXOqw8B',
    about: 'Data scientist and bookworm',
  },
];

async function seedUsers() {
  try {
    await User.deleteMany({}); 
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;

      const newUser = new User(user);
      await newUser.save();
    }

    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

export default seedUsers;
