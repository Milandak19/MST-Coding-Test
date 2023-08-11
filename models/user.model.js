const bcrypt = require("bcryptjs");
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      username: {
        type: Sequelize.STRING,
        unique: {
          args: true,
          msg: "Username has been taken.",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email cannot be empty",
          },
          notEmpty: {
            msg: "Email cannot be empty",
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        unique: {
          args: true,
          msg: "Email has been taken.",
        },
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Invalid email format.",
          },
          notNull: {
            msg: "Email cannot be empty",
          },
          notEmpty: {
            msg: "Email cannot be empty",
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password cannot be empty",
          },
          notEmpty: {
            msg: "Password cannot be empty",
          },
        },
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Fullname cannot be empty",
          },
          notEmpty: {
            msg: "Fullname cannot be empty",
          },
        },
      },
      photo: {
        type: Sequelize.STRING,
        defaultValue:
          "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1691788968~exp=1691789568~hmac=4f88379060d4912c7ac5d48e13d08b8ba2cf463be78091bcc0db7308b7984b7d",
      },
      token: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["unverified", "verified"],
        defaultValue: "unverified",
      },
    },
    {
      hooks: {
        beforeCreate: async (user, option) => {
          user.password = bcrypt.hashSync(user.password, 8);
        },
      },
    }
  );

  return User;
};
