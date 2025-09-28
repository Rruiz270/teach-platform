// Production start script that compiles TypeScript on the fly
console.log('Starting TEACH Platform Backend...');

// Register TypeScript
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
    target: 'es2022',
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    strict: false,
    skipLibCheck: true
  }
});

// Start the application
require('./src/index.ts');