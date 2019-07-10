'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductOrder = sequelize.define('ProductOrder', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
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