NEWSCHEMA('Rejects', function (schema) {

	schema.define('loadid', Number);
	schema.define('rejectdate', 'Date', true);
	schema.define('quantity', Number);
	schema.define('reason', Number);
	schema.define('rejecttype', Number);
	schema.define('loadorderid', 'String', true);
	schema.define('deliveryid', Number, true);
	schema.define('invoiceid', Number, true);
	schema.define('commentario', 'String(150)', false);

	schema.setQuery(function ($) {

		// Performs automatically pagination, sort and all checks
		// DBMS().list('integraciones.planning').autofill($, 'creation_date:Date,last_update:Date', 'id', 'creation_date_desc', 50).callback($.callback);
		DBMS().find('integraciones.rejects').callback($.callback);
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
		DBMS().debug().insert('integraciones.rejects', model).log($, model).callback($.done(model.rejectid));

	});

	schema.setRead(async function ($) {

		// Performs automatically pagination, sort and all checks
		// DBMS().list('integraciones.planning').autofill($, 'creation_date:Date,last_update:Date', 'id', 'creation_date_desc', 50).callback($.callback);
		var plannings = await DBMS().debug().find('integraciones.planning')
			.join('delivery', 'integraciones.planning_delivery').on('loadid', 'loadid')
			.join('invoice', 'integraciones.invoice').on('loadid', 'loadid')
			.join('product', 'integraciones.invoice_product').on('loadid', 'loadid')
			.promise();
		// console.log(data)
		$.callback(plannings);
		// Or you can use a simple query via:
		// DBMS().find('integraciones.planning').callback($.callback);

	});

});