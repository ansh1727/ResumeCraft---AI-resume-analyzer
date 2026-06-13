import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const existing = await User.findOne({ email: 'admin@resumecraft.local' });
    if (existing) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    await User.create({
      name: 'Admin User',
      email: 'admin@resumecraft.local',
      password: 'admin123',
      role: 'admin',
    });

    console.log('Admin user created: admin@resumecraft.local / admin123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
