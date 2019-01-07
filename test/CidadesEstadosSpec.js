describe("Estados", function() {
	const ce = new CidadesEstados();
	let jsonEstados;
	let promiseHelper;

	beforeEach(function() {
		var fetchPromise = new Promise(function(resolve, reject) {
			promiseHelper = {
				resolve: resolve,
				reject: reject
			};
		});
		spyOn(window,'fetch').and.returnValue(fetchPromise);
		jsonEstados = ce.getEstados();
	});

	it('getEstados method should be implemented', function() {
    expect(ce.getEstados).toBeDefined();
  });

	it('fetch json estados', function() {
		expect(window.fetch).toHaveBeenCalledWith(ce.json_path.estados + '/estados.json');
	});

	it('returns a promise', function() {
		expect(jsonEstados).toEqual(jasmine.any(Promise));
	});

	describe('on successful fetch', function() {
		beforeEach(function() {
			var json = {
				"estados": [
					{
						"id": "SP",
						"estado": "São Paulo"
					}
				]
			};
			var response = new Response(JSON.stringify(json));
			promiseHelper.resolve(response);
		});

		it('resolves its promise with estado', function(done) {
			jsonEstados.then(function(estados) {
				expect(estados.estados[0].id).toEqual('SP');
				expect(estados.estados[0].estado).toEqual('São Paulo');
				done();
			});
		});

	});

});

describe("Cidades", function() {
	const ce = new CidadesEstados();
	let jsonCidades;
	let promiseHelper;

	beforeEach(function() {
		var fetchPromise = new Promise(function(resolve, reject) {
			promiseHelper = {
				resolve: resolve,
				reject: reject
			};
		});
		spyOn(window, 'fetch').and.returnValue(fetchPromise);
		jsonCidades = ce.getCidades('DF');
	});

	it('getCidades method should be implemented', function() {
    expect(ce.getCidades).toBeDefined();
  });

	it('fetch json cidades', function() {
		expect(window.fetch).toHaveBeenCalledWith(ce.json_path.cidades + '/DF.json');
	});

	it('returns a promise', function() {
		expect(jsonCidades).toEqual(jasmine.any(Promise));
	});

	describe('on successful fetch', function() {
		beforeEach(function() {
			var json = {
				"cidades": [
					{
						"id": "DF",
						"cidade": "Brasília",
						"capital": true
					}
				]
			};
			var response = new Response(JSON.stringify(json));
			promiseHelper.resolve(response);
		});

		it('resolves its promise with cidade', function(done) {
			jsonCidades.then(function(cidades) {
				expect(cidades.cidades[0].id).toEqual('DF');
				expect(cidades.cidades[0].cidade).toEqual('Brasília');
				expect(cidades.cidades[0].capital).toBe(true);
				done();
			});
		});

	});

});
