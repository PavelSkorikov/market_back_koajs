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
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        len: [2,50]
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [2,250]
      }
    }
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