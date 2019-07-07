'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    count_products: DataTypes.INTEGER,
    price_products: DataTypes.JSON,
    price_order: DataTypes.FLOAT,
    status: DataTypes.STRING,
    comment: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,
        len: [2,250]
      }
    },
    pyment_method: DataTypes.STRING,
    delivery_method: DataTypes.STRING
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