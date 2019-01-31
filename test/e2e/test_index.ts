import 'reflect-metadata';
import Settings from '../../src/domain/config/Settings';
import WebApplication from '../../src/WebApplication';

function buildExpressApplicationForTest() {
  process.on('unhandledRejection', console.dir);

  // Support source map.
  require('source-map-support').install();
  process.on('unhandledRejection', console.log);

  const settings: Settings = {
    pg: {
      database: 'sample',
      host: 'localhost',
      password: 'sample_password',
      port: 5432,
      user: 'sample_user',
    },
    port: 3000,
  };

  const app = new WebApplication();
  return app.buildExpressApplication(settings);
}

export default buildExpressApplicationForTest;
