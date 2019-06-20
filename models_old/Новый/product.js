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
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    model: {
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    availability: {
      allowNull: false,
      type: DataTypes.STRING
    },
    count: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
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