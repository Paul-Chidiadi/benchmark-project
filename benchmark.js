// benchmark.js
const Benchmark = require('benchmark');

const eventEmitterBenchmark = require('./tests/eventEmitterBenchmark');
const processNextTickBenchmark = require('./tests/processNextTickBenchmark');
const backgroundJobSchedulerBenchmark = require('./tests/backgroundJobSchedulerBenchmark');

// Event Emitter Benchmark
new Benchmark.Suite()
  .add('EventEmitter', eventEmitterBenchmark)
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run({ async: true });

// Process.nextTick Benchmark
new Benchmark.Suite()
  .add('process.nextTick', processNextTickBenchmark)
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run({ async: true });

// Background Job Scheduler Benchmark
new Benchmark.Suite()
  .add('BackgroundJobScheduler', backgroundJobSchedulerBenchmark)
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run({ async: true });
