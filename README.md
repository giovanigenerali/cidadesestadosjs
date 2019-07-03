# Cidades e Estados BR - JS

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b9b13b17c3504457917f865d56013895)](https://app.codacy.com/app/wgenial/cidadesestadosjs?utm_source=github.com&utm_medium=referral&utm_content=wgenial/cidadesestadosjs&utm_campaign=Badge_Grade_Settings)
[![Known Vulnerabilities](https://snyk.io/test/github/wgenial/cidadesestadosjs/badge.svg)](https://snyk.io/test/github/wgenial/cidadesestadosjs)

Lista de cidades e estados do Brasil que carrega um campo `<select>` com os estados e outro `<select>` com as cidades do estados selecionado.

---

## Como utilizar

A instalação é simples e básica, só incluir o script no html e configurar os campos `select` conforme abaixo:

```html
<script src="/dist/CidadesEstados.min.js"></script>
```

---

### Estados

```html
<select name="estado" data-estado="SP" data-grupo-id="1"></select>
```

Attributos:

- `data-estado=<estado>`

	- Valor do estado (ex: SP, RJ, etc...) para carregamento automático, o valor é opcional.
	- Caso não queira carregar um estado automaticamente deixe vazio. `data-estado=""`

- `data-grupo-id=<ID>`

	- ID do grupo que os campos estados e cidade pertencem e vão interagir.
	- Atributo obrigatório.


### Cidades

```html
<select name="cidade" data-cidade="São Paulo" data-grupo-id="1"></select>
```

Attributos:

- `data-cidade=<cidade>`

	- Valor do estado (ex: São Paulo, Rio de Janeiro, etc...) para carregamento automático, o valor é opcional.
	- Caso não queira carregar uma cidade automaticamente deixe vazio. `data-cidade=""`

- `data-grupo-id=<ID>`

	- ID do grupo que os campos estados e cidade pertencem e vão interagir.
	- Atributo obrigatório.


---

## Utilizando múltiplos campos

Para utilizar múltiplos campos é só definir o nome do grupo dos campos correspondentes:

```html
<select name="estado[]" data-estado="SP" data-grupo-id="1"></select>
<select name="cidade[]" data-cidade="São Paulo" data-grupo-id="1"></select>

<select name="estado[]" data-estado="RJ" data-grupo="2"></select>
<select name="cidade[]" data-cidade="Rio de Janeiro" data-grupo-id="2"></select>

<select name="estado[]" data-estado="DF" data-grupo-id="3"></select>
<select name="cidade[]" data-cidade="" data-grupo-id="3"></select>

<select name="estado[]" data-estado="" data-grupo-id="4"></select>
<select name="cidade[]" data-cidade="" data-grupo-id="4"></select>
```
