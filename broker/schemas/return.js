NEWSCHEMA('Return', function (schema) {

	schema.define('returnid', Number);
	schema.define('reg_status', 'String(1)', true);
	schema.define('pickupdate', 'Date', true);
	schema.define('pickupreason', Number, true);

	schema.setQuery(async function ($) {

		// Performs automatically pagination, sort and all checks
		// DBMS().list('integraciones.planning').autofill($, 'creation_date:Date,last_update:Date', 'id', 'creation_date_desc', 50).callback($.callback);
		var builder = await DBMS().debug().find('integraciones.returns')
			.join('customer', 'integraciones.returns_customer').on('returnid', 'returnid')
			.join('product', 'integraciones.returns_products').on('returnid', 'returnid').promise()
			$.callback(builder);
		// Or you can use a simple query via:
		// DBMS().find('integraciones.planning').callback($.callback);

	});


	schema.setInsert(function ($, model) {

		// Assigns additional values
		model.last_update = new Date();
		model.user_update = 'PROCTER';
		console.log('insert reject')
		console.log(model)
		// Performs query
		DBMS().debug().insert('integraciones.returns', model).log($, model).callback($.done(model.returnid));

	});

	schema.setUpdate(function ($, model) {

		// Assigns additional values
		model.last_update = new Date();

		// Performs query
		// 404 error will be returned if the no records won't be updated
		console.log(model);
		DBMS().modify('integraciones.returns', model).where('returnid', model.returnid).log($, model).error(404).callback($.done($.returnid));

	});

});