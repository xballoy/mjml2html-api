# mjml2html API

[![CI](https://github.com/xballoy/mjml2html-api/actions/workflows/ci.yml/badge.svg)](https://github.com/xballoy/mjml2html-api/actions/workflows/ci.yml)

> API to convert MJML to HTML

## Requirements

- [Docker](https://www.docker.com/)

## Getting started

Start the project:

```shell
docker compose up -d
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