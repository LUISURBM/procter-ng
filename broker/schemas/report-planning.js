NEWSCHEMA('ReportPlanning', function (schema) {

	schema.setQuery(function ($,model) {

		console.log('planning');
		console.log($.params);

		DBMS().debug().find('integraciones.planning')
			.between('creation_date', $.params.fechainicio, $.params.fechafin)
			.callback($.callback);

	});

});
