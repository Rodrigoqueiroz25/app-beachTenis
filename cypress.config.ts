import { defineConfig } from "cypress";
import '@cypress/instrument-cra';

export default defineConfig({

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    }
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
  },

  env:{
    codeCoverage: {
      exclude: 'cypress/**/*.*'
    }
  }
});
