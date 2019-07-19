'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
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
    description: {
      type: DataTypes.STRING
    },
    availability: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
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