import 'reflect-metadata';
import Parameters from './infrastracture/datasource/config/Parameters';
import WebApplication from './WebApplication';

process.on('unhandledRejection', console.dir);

// Support source map.
require('source-map-support').install();
process.on('unhandledRejection', console.log);

const parameters = new Parameters(process.argv);
parameters.analyzeArgs();
const settings = parameters.loadSettings();

const app = new WebApplication(settings);
app.run();
