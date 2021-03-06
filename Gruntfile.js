/* eslint-env node */
'use strict';

var packageJson = require('./package.json');
var path = require('path');
var swPrecache = require('sw-precache');

module.exports = function(grunt) {
  grunt.initConfig({
    swPrecache: {
      // Esta opción genera un SW que no cachea, es para usar si estamos modificando los archivos de la app durante desarrollo
      dev: {
        handleFetch: false,
        rootDir: '.'
      },
      // Esta opción es la normal, genera un SW que implementa el cache
      dist: {
        handleFetch: true,
        rootDir: '.'
      }
    }
  });

  function writeServiceWorkerFile(rootDir, handleFetch, callback) {
    var config = {
      // Especificamos todos los recursos que puede llegar a levantar la app
      staticFileGlobs: [
      "CSS/**/*.{js,html,css,png,jpg,gif,woff,woff2,ttf,svg,eot,json}",
      "Fonts/**/*.{js,html,css,png,jpg,gif,woff,woff2,ttf,svg,eot,json}",
      "Images/**/*.{js,html,css,png,jpg,gif,woff,woff2,ttf,svg,eot,json}",
      "JS/**/*.{js,html,css,png,jpg,gif,woff,woff2,ttf,svg,eot,json}",
      "Lib/**/*.{js,html,css,png,jpg,gif,woff,woff2,ttf,svg,eot,json}",
      "*.html",
      ],
      runtimeCaching: [{
        // See https://github.com/GoogleChrome/sw-toolbox#methods
        urlPattern: /fontawesome/,
        handler: "cacheFirst",
        // See https://github.com/GoogleChrome/sw-toolbox#options
        options: {
          cache: {
            maxEntries: 3,
            name: "runtime-cache-1"
          }
        }
      }],  
      // If handleFetch is false (i.e. because this is called from swPrecache:dev), then
      // the service worker will precache resources but won't actually serve them.
      // This allows you to test precaching behavior without worry about the cache preventing your
      // local changes from being picked up during the development cycle.
      handleFetch: handleFetch,
      // verbose defaults to false, but for the purposes of this demo, log more.
      verbose: true
    };

    swPrecache.write(path.join(rootDir, 'service-worker.js'), config, callback);
  }

  grunt.registerMultiTask('swPrecache', function() {
    var done = this.async();
    var rootDir = this.data.rootDir;
    var handleFetch = this.data.handleFetch;

    writeServiceWorkerFile(rootDir, handleFetch, function(error) {
      if (error) {
        grunt.fail.warn(error);
      }
      done();
    });
  });
};