'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    count_products: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    price_products: {
      type: DataTypes.JSON
    },
    price_order: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.FLOAT
    },
    status: {
      allowNull: false,
      defaultValue: 'created',
      type: DataTypes.STRING
    },
    comment: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,
        len: [2,250]
      }
    },
    pyment_method: {
      allowNull: false,
      defaultValue: 'undefined',
      type: DataTypes.STRING
    },
    delivery_method: {
      allowNull: false,
      defaultValue: 'undfined',
      type: DataTypes.STRING
    }
  }, {});
  Order.associate = function(models) {
    Order.belongsToMany(models.Product, {
      through: models.ProductOrder,
      foreignKey: 'OrderId',
      onDelete: "CASCADE"
    });
    Order.belongsTo(models.User, {
      foreignKey: "UserId",
      onDelete: "CASCADE"
    });

    // associations can be defined here
  };
  return Order;
};