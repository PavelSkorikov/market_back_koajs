'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    group: {
      allowNull: false,
      defaultValue: 'user',
      type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      defaultValue: 'offline',
      type: DataTypes.STRING
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Order, {
      foreignKey: "UserId",
      onDelete: "CASCADE"
    });
    User.hasOne(models.Contact, {
      foreignKey: "UserId",
      onDelete: "CASCADE"
    });
  };

  return User;
};