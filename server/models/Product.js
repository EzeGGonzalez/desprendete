var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Product = new keystone.List('Product', {
  autokey: { path: 'slug', from: 'name _id', unique: true }  
});

Product.add({
	name: { type: Types.Text, initial: true, required: true },
	description: { type: Types.Textarea },
  status: { type: Types.Number },
  condition: { type: Types.Select, options: 'good, broken', emptyOption: false },
  address: { type: Types.GeoPoint },
  mainImage: { type: Types.CloudinaryImage },
  images: { type: Types.CloudinaryImages },
  createdAt: { type: Types.Datetime, default: Date.now },  
  owner: { type: Types.Relationship, ref: 'User' }
});

/**
 * Registration
 */
Product.defaultColumns = 'name, owner';
Product.register();
