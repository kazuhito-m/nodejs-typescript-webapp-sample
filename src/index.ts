import 'reflect-metadata';

import WebApplication from './WebApplication';
process.on('unhandledRejection', console.dir);

// Support source map.
require('source-map-support').install();
process.on('unhandledRejection', console.log);

const app = new WebApplication();
app.run(process.argv);
