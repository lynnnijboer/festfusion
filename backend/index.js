"use strict";

import {default as Express} from 'express';
import * as HTTP from 'http';
import * as Vite from 'vite';
import {svelte} from '@sveltejs/vite-plugin-svelte';

// Create our express app
const app = Express();
app.use(Express.json());
app.use(Express.static('public'));

// Connect it to a web server
const httpServer = HTTP.createServer();
httpServer.on('request', app);



// All other requests are handled by Vite, to server our Svelte frontend application.
app.use((await Vite.createServer({
	root: 'frontend/',
	logLevel: 'info',
	server: {
		middlewareMode: true,
		hmr: {server: httpServer}
	},
	plugins: [
		svelte(),
	],
	appType: 'spa',
})).middlewares);


// Read host and port from environment variables and start the web server
const host = process.env.HOST || '0.0.0.0';
const port = (0|process.env.PORT) || 3000;
httpServer.listen(port, host, () => {
	console.log(`Running at http://${host}:${port}`);
});
