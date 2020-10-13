# KITENGE

> RESTful API using NodeJS, Express and Mongoose

<br>
<hr>
<p align="center">
If you find this useful, please don't forget to star ⭐️ the repo, as this will help to promote the project.<br>
Follow me on <a href="https://twitter.com/makpalyy">Twitter</a> and <a href="https://github.com/ma-za-kpe">GitHub</a> to keep updated about this project and <a href="https://github.com/ma-za-kpe?tab=repositories">others</a>.
</p>
<hr>
<br>

## Features

- **Really RESTful** - It follows the best practices
- **User registration API** - Using [passport](https://www.npmjs.com/package/jsonwebtoken)
- **Password reset API** - Sending emails with [SendGrid API](https://sendgrid.com/docs/API_Reference/index.html) (optional)
- **Listing query strings** - `q`, `page`, `limit`, `fields` etc.
- **API docs generator** - Using [docgen](https://github.com/thedevsaddam/docgen)
- **Love ♥** - Using [maku](https://github.com/ma-za-kpe)

## Installation

First install using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

## Commands

After you generate your project, these commands are available in `package.json`.

```bash
Clone this github repo in your terminal

$ cd Kitenge-Backend

$ npm install

$ npm run dev # run the API in development mode

$ npm run prod # run the API in production mode
```

## Playing locally

First, you will need to install and run [MongoDB](https://www.mongodb.com/) in another terminal instance.

```bash
$ mongod
```

Then, run the server in development mode.

```bash
$ npm run dev
Express server listening on http://0.0.0.0:3000, in development mode
```

The API docs can be ound here: [Kitengi](http://www.kiteng3.com/)

## TODO

- Support optional phone authentication
- Support optional email confirmation process
- Support Twitter and other social login methods
- Socket.io support

PRs are welcome.

## Credits

[maku](https://github.com/ma-za-kpe)

## License

MIT © [maku](https://github.com/ma-za-kpe)
