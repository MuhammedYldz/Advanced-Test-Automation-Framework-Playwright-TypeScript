module.exports = {
  default: {
    paths: ['src/features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['src/steps/**/*.ts', 'src/support/**/*.ts'],
    format: [
      'summary',
      'progress',
      'html:test-results/cucumber-report.html',
      'allure-cucumberjs/reporter'
    ],
    formatOptions: {
      resultsDir: 'allure-results'
    },
    parallel: 2, // Run 2 workers in parallel
    publishQuiet: true
  }
}
