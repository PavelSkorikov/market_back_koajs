'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {});
  Group.associate = function(models) {
    Group.hasMany(models.User, {
      foreignKey: "GroupId",
      onDelete: "CASCADE"
    });
  };
  return Group;
};