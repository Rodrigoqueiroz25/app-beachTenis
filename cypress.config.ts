import { defineConfig } from "cypress";
import getCompareSnapshotsPlugin from 'cypress-visual-regression/dist/plugin';
import '@cypress/instrument-cra';

export default defineConfig({

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      getCompareSnapshotsPlugin(on, config);
      return config
    },
    viewportHeight: 812,
    viewportWidth: 450
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      getCompareSnapshotsPlugin(on, config);
      return config
    },
  },

  env:{
    type: 'base',
    screenshotsFolder: './cypress/snapshots/actual',
    trashAssetsBeforeRuns: true,
    video: false,
    failSilently: false,
    codeCoverage: {
      exclude: 'cypress/**/*.*'
    }
  }
});
