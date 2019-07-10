'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
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
    model: {
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.FLOAT,
      validate: {
        isNumeric: true,
        len: [2,50]
      }
    },
    availability: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    },
    count: {
      allowNull: false,
      defaultValue: 0,
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