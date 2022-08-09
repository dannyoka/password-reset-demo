const { User } = require('../models');
const sequelize = require('../config/sequelize');
const users = [
  {
    email: 'danny@test.com',
    password: 'testpassword',
    phone_number: '+18005551234',
  },
  {
    email: 'jeff@test.com',
    password: 'newpassword',
    phone_number: '+18005550198',
  },
  {
    email: 'steve@test.com',
    password: 'newerpassword',
    phone_number: '+18005550123',
  },
];

const seedUsers = async () => {
  await User.bulkCreate(users, { individualHooks: true });
};
sequelize.sync({ force: false }).then(() => {
  seedUsers();
});
