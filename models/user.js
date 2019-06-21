'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      unique: false,
      type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      unique: false,
      type: DataTypes.STRING
    },
    discount: {
      allowNull: true,
      unique: false,
      type: DataTypes.INTEGER
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Order, {
      foreignKey: "UserId",
      onDelete: "CASCADE"
    });
    User.hasOne(models.Contact, {
      foreignKey: "UserId",
      onDelete: "CASCADE"
    });
    User.belongsTo(models.Group, {
      foreignKey: "GroupId",
      onDelete: 'CASCADE'
    });
  };

  return User;
};