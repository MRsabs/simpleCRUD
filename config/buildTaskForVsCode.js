const Bundler = require('parcel-bundler');
const Path = require('path');

const entryFiles = Path.join(__dirname, '../src/server.ts');



(async function() {

  const bundler = new Bundler(entryFiles, {target: "node", watch: false});
  await bundler.bundle();
})();
