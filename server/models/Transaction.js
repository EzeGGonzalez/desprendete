var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Transaction Model
 * ==========
 */
var Transaction = new keystone.List('Transaction');

Transaction.add({
  status: { type: Types.Select, options: 'pending, completed, canceled' },
  product: { type: Types.Relationship, ref: 'Product' },
  owner: { type: Types.Relationship, ref: 'User' },
  createdAt: { type: Types.Datetime, default: Date.now }
});

/**
 * Registration
 */
Transaction.defaultColumns = 'product, owner';
Transaction.register();
