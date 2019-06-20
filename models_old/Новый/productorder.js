'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductOrder = sequelize.define('ProductOrder', {

  }, {});
  ProductOrder.associate = function(models) {
    ProductOrder.belongsTo(models.Product, {
      foreignKey: 'ProductId',
      onDelete: 'CASCADE'
    });
    ProductOrder.belongsTo(models.Order, {
      foreignKey: 'OrderId',
      onDelete: 'CASCADE'
    });

  };
  return ProductOrder;
};