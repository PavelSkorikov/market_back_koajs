'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlphanumeric: true,
        len: [2,250]
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [5,250]
      }
    },
    model: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,
        len: [2,250]
      }
    },
    price: {
      allowNull: false,
      type: DataTypes.FLOAT,
      validate: {
        isNumeric: true,
        len: [2,50]
      }
    },
    availability: {
      allowNull: false,
      type: DataTypes.STRING
    },
    count: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    associate: function(models) {
			Product.belongsTo(models.Company, {
				foreignKey: "CompanyId",
				onDelete: 'CASCADE'
			});
      Product.belongsTo(models.Category, {
        foreignKey: "CategoryId",
        onDelete: 'CASCADE'
      });
      Product.hasMany(models.Image, {
        foreignKey: 'ProductId',
        onDelete: "CASCADE"
      });
      Product.belongsToMany(models.Order, {
        through: models.ProductOrder,
        foreignKey: 'ProductId',
        onDelete: "CASCADE"
      });
    }
  });

  return Product;
};