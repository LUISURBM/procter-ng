NEWSCHEMA('ReportReject', function (schema) {

	schema.setQuery(function ($, model) {

		// Performs automatically pagination, sort and all checks
		// DBMS().list('integraciones.planning').autofill($, 'creation_date:Date,last_update:Date', 'id', 'creation_date_desc', 50).callback($.callback);
		console.log($.params);
		DBMS().debug().find('integraciones.rejects')
			.between('creation_date', $.params.fechainicio, $.params.fechafin)
			.callback($.callback);

	});

});
