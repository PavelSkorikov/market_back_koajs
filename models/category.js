'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    description: {
      unique: true,
      type: DataTypes.STRING
    },
    image: {
      type:DataTypes.STRING
    },
    availability: {
      allowNull: false,
      type: DataTypes.STRING
    },
    level: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    parent_name: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function (models) {
        Category.hasMany(models.Product, {
          foreignKey: 'CategoryId',
          onDelete: 'CASCADE'
        });
      }
    }
  });

  return Category;
};