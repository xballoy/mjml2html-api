# mjml2html API

[![CI](https://github.com/xballoy/mjml2html-api/actions/workflows/ci.yml/badge.svg)](https://github.com/xballoy/mjml2html-api/actions/workflows/ci.yml)

> API to convert MJML to HTML

## Requirements

- Node.js ([see .nvmrc file for the supported version](./.nvmrc))

## Getting started

Start the project:

```shell
npm ci
npm build
npm run start:prod
```

Convert a template:

```shell
curl --request POST \
  --url http://localhost:3000/ \
  --header 'Content-Type: application/json' \
  --data ' {
	 "mjml": "<mjml> <mj-body> <mj-section> <mj-column> <mj-text> Hello World! </mj-text> </mj-column> </mj-section> </mj-body> </mjml>"
 }'
```

## Licence

[MIT](./LICENCE.md)