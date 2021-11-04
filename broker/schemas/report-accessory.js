NEWSCHEMA('ReportAccessory', function (schema) {

	schema.setQuery(function ($,model) {

		console.log('accessory');
		console.log($.params);

		DBMS().debug().find('integraciones.accessory')
			.between('creation_date', $.params.fechainicio, $.params.fechafin)
			.callback($.callback);

	});

});
