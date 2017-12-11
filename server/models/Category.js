var keystone = require('keystone');
var Types = keystone.Field.Types;

var Category = new keystone.List('Category', {
  autokey: { path: 'slug', from: 'name', unique: true }  
});

Category.add({
	name: { type: Types.Text, initial: true, required: true },
  image: { type: Types.CloudinaryImage },
  parent: { type: Types.Relationship, ref: 'Category' },
  createdAt: { type: Types.Datetime, default: Date.now }
});

Category.defaultColumns = 'name';
Category.register();
