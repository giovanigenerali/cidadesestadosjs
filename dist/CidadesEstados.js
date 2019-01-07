/* CidadesEstados JS
 * https://github.com/wgenial/
 * Developed by WGenial - http://wgenial.com.br
 */

'use strict';

export class CidadesEstados {

	constructor() {
		this.json_path = {
			estados: '/dist/json',
			cidades: '/dist/json/cidades',
		}
		this.json = {
			estados: null,
			cidades: []
		}
	}

	init() {
		this.renderEstados();
		this.changeEstados();
		this.changeCidades();
	}

	async getEstados() {
		const response = await fetch(`${this.json_path.estados}/estados.json`);
		return await response.json();
	}

	async getCidades(estado) {
		if (!this.json.cidades.hasOwnProperty(estado)) {
			const response = await fetch(`${this.json_path.cidades}/${estado}.json`);
			this.json.cidades[estado] = await response.json();
		}
		return this.json.cidades[estado];
	}

	renderEstados() {
		let estadosObj = document.querySelectorAll('select[data-estado]');

		if (estadosObj.length == 0) {
			return false;
		}

		this.getEstados()
			.then((response) => {
				this.json.estados = response.estados;

				estadosObj.forEach((estadoObj) => {
					let estadoAttr = estadoObj.getAttribute('data-estado');
					let grupoIdAttr = estadoObj.getAttribute('data-grupo-id');

					while(estadoObj.firstChild) {
						estadoObj.removeChild(estadoObj.firstChild);
					}
					estadoObj.options[estadoObj.options.length] = new Option('Selecione um estado', '');

					this.json.estados.forEach((estado) => {
						estadoObj.options[estadoObj.options.length] = (estado.id == estadoAttr) ? new Option(estado.estado, estado.id, null, true) : new Option(estado.estado, estado.id);
					});

					this.renderCidades(estadoAttr, grupoIdAttr);

				});

			})
			.catch(err => console.log(err));
	}

	renderCidades(estado, grupoId) {
		let cidadeObj = document.querySelector(`[data-cidade][data-grupo-id='${grupoId}']`);
		let cidadeAttr = cidadeObj.getAttribute('data-cidade');

		while (cidadeObj.firstChild) {
			cidadeObj.removeChild(cidadeObj.firstChild);
		}
		cidadeObj.options[cidadeObj.options.length] = new Option('Selecione uma cidade', '');

		if (estado != '') {
			this.getCidades(estado)
				.then((response) => {
					response.cidades.forEach((cidade) => {

						if (cidadeAttr == '' && cidade.capital) {
							cidadeObj.options[cidadeObj.options.length] = new Option(cidade.cidade, cidade.cidade, null, true);
							cidadeObj.setAttribute('data-cidade', cidade.cidade);
						} else {
							cidadeObj.options[cidadeObj.options.length] = (cidade.cidade == cidadeAttr) ? new Option(cidade.cidade, cidade.cidade, null, true) : new Option(cidade.cidade, cidade.cidade);
						}

					});
				})
				.catch(err => console.log(err));
		}

	}

	changeEstados() {
		document.addEventListener('change', (event) => {
			if (event.target.matches('[data-estado]')) {
				let estadoObj = event.target;
				let estadoAttr = estadoObj.value;
				let grupoIdAttr = estadoObj.getAttribute('data-grupo-id');
				let cidadeObj = document.querySelector(`[data-cidade][data-grupo-id='${grupoIdAttr}']`);

				estadoObj.setAttribute('data-estado', estadoAttr);
				cidadeObj.setAttribute('data-cidade', '');

				this.renderCidades(estadoAttr, grupoIdAttr);
			}
		});
	}

	changeCidades() {
		document.addEventListener('change', (event) => {
			if (event.target.matches('[data-cidade]')) {
				let cidadeObj = event.target;
				cidadeObj.setAttribute('data-cidade', cidadeObj[cidadeObj.selectedIndex].text);
			}
		});
	}

}
