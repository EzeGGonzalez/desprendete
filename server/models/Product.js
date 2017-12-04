var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Product = new keystone.List('Product');

Product.add({
	name: { type: Types.Text, initial: true, required: true },
	description: { type: Types.Textarea, initial: true, required: true },
  status: { type: Types.Number },
  condition: { type: Types.Select, options: 'good, broken', emptyOption: false },
  address: { type: Types.GeoPoint },
  mainImage: { type: Types.CloudinaryImage },
  images: { type: Types.CloudinaryImages },
  owner: { type: Types.Relationship, ref: 'User' }  
});

/**
 * Registration
 */
Product.defaultColumns = 'name, owner';
Product.register();
