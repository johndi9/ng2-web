const helpers = require('./helpers');
const path = require('path');
const webpack = require('webpack');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const SassLintPlugin = require('sasslint-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

/*
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
  title: 'Juan Diego de Miguel Web',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};
const HELPER_SCSS_PATH = path.resolve(__dirname, 'src', 'assets', 'scss');
const BROWSERS = ['ie >= 9', 'Chrome >= 39', 'Safari >= 8', 'Firefox >= 34', 'ChromeAndroid >= 39', 'last 2 versions'];

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
  const isProd = options.env === 'production';
  let htmlLoader;


  if (isProd) {
    htmlLoader = {
      minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true,
        customAttrSurround: [
        [/#/, /(?:)/],
        [/\*/, /(?:)/],
        [/\[?\(?/, /(?:)/]
      ],
      customAttrAssign: [/\)?\]?=/]
    }
  }

  return {

    /*
     * Cache generated modules and chunks to improve performance for multiple incremental builds.
     * This is enabled by default in watch mode.
     * You can pass false to disable it.
     *
     * See: http://webpack.github.io/docs/configuration.html#cache
     */
    //cache: false,

    /*
     * The entry point for the bundle
     * Our Angular.js app
     *
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: {

      'polyfills': './src/polyfills.browser.ts',
      'vendor': './src/vendor.browser.ts',
      'main': './src/main.browser.ts'

    },

    /*
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

      /*
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.js', '.json', '.html', '.txt', '.gif', '.jpg', '.png', '.woff', '.woff2', '.ttf', '.eot', '.svg', '.scss'],

      // An array of directory names to be resolved to the current directory
      modules: [helpers.root('src'), 'node_modules'],

    },

    /*
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {

      rules: [

        /*
         * Tslint loader support for *.ts files
         *
         * See: https://github.com/wbuchwalter/tslint-loader
         */
        {
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'tslint-loader',
          exclude: [helpers.root('node_modules')]
        },

        /*
         * Sasslint loader support for *.sass files
         *
         * See: https://github.com/alleyinteractive/sasslint-webpack-plugin
         */
        {
          enforce: 'pre',
          test: /\.scss$/,
          loader: 'sasslint-loader',
          exclude: [helpers.root('node_modules')]
        },

        /*
         * Sasslint loader support for *.sass files
         *
         * See: https://github.com/alleyinteractive/sasslint-webpack-plugin
         */
        //{
        //  enforce: 'pre',
        //  test: /\.html$/,
        //  loader: 'html?minimize=false',
        //  exclude: [helpers.root('src/index.html')]
        //},

        /*
         * Source map loader support for *.js files
         * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
         *
         * See: https://github.com/webpack/source-map-loader
         */
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            // these packages have problems with their sourcemaps
            helpers.root('node_modules/rxjs'),
            helpers.root('node_modules/@angular')
          ]
        },

        /*
         * Typescript loader support for .ts and Angular 2 async routes via .async.ts
         * Replace templateUrl and stylesUrl with require()
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader
         * See: https://github.com/TheLarkInn/angular2-template-loader
         */
        {
          test: /\.ts$/,
          loaders: [
            '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
            'awesome-typescript-loader',
            'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },

        /*
         * Json loader support for *.json files.
         *
         * See: https://github.com/webpack/json-loader
         */
        {
          test: /\.json$/,
          loader: 'json-loader'
        },

        /*
         * to string and css loader support for *.css files
         * Returns file content as string
         *
         */
        {
          test: /\.css$/,
          loaders: ['to-string-loader', 'css-loader']
        },

        /*
         * Raw loader support for *.html
         * Returns file content as string
         *
         * See: https://github.com/webpack/raw-loader
         */
        {
          test: /\.html$/,
          loader: 'html?minimize=false',
          exclude: [helpers.root('src/index.html')]
        },

        /*
         * File loader for supporting images, for example, in CSS files.
         */
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'url?limit=10000&mimetype=image/[ext]'
        },

        /*
         * File loader for supporting fonts
         */
        {
          test: /\.woff(\?.*)?$/,
          loader: 'url?mimetype=application/font-woff'
        },
        {
          test: /\.woff2(\?.*)?$/,
          loader: 'url?mimetype=application/font-woff2'
        },
        {
          test: /\.ttf(\?.*)?$/,
          loader: 'url?mimetype=application/vnd.ms-fontobject'
        },
        {
          test: /\.eot(\?.*)?$/,
          loader: 'url?mimetype=application/x-font-ttf'
        },
        {
          test: /\.svg(\?.*)?$/,
          loader: 'url?mimetype=image/svg+xml'
        },

        /*
         * File loader for supporting SASS files
         */
        {
          test: /\.scss$/,
          use: [
            'to-string',
            'css-loader?sourceMap',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('postcss-url')(),
                  require('postcss-cssnext')({ browsers: BROWSERS }),
                  require('postcss-browser-reporter')(),
                  require('postcss-reporter')()
                ]
              }
            },
            {
              loader: 'sass-loader?sourceMap',
              options: {
                includePaths: [HELPER_SCSS_PATH]
              }
            }
          ]
        }

      ],

    },

    /*
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [
      new AssetsPlugin({
        path: helpers.root('dist'),
        filename: 'webpack-assets.json',
        prettyPrint: true
      }),

      /*
       * Plugin: ForkCheckerPlugin
       * Description: Do type checking in a separate process, so webpack don't need to wait.
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
       */
      new ForkCheckerPlugin(),
      /*
       * Plugin: CommonsChunkPlugin
       * Description: Shares common code between the pages.
       * It identifies common modules and put them into a commons chunk.
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
       * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
       */
      new CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),

    /**
     * Plugin: ContextReplacementPlugin
     * Description: Provides context to Angular's use of System.import
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
     * See: https://github.com/angular/angular/issues/11580
     */
      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('src') // location of your src
      ),

      /*
       * Plugin: CopyWebpackPlugin
       * Description: Copy files and directories in webpack.
       *
       * Copies project static assets.
       *
       * See: https://www.npmjs.com/package/copy-webpack-plugin
       */
      new CopyWebpackPlugin([
          { from: 'src/assets', to: 'assets' },
          { from: 'src/meta' },
        ],  { ignore: ['*.scss']}
      ),


      /*
       * Plugin: HtmlWebpackPlugin
       * Description: Simplifies creation of HTML files to serve your webpack bundles.
       * This is especially useful for webpack bundles that include a hash in the filename
       * which changes every compilation.
       *
       * See: https://github.com/ampedandwired/html-webpack-plugin
       */
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: METADATA.title,
        chunksSortMode: 'dependency',
        metadata: METADATA
      }),

      /*
       * Plugin: ScriptExtHtmlWebpackPlugin
       * Description: Enhances html-webpack-plugin functionality
       * with different deployment options for your scripts including:
       *
       * See: https://github.com/numical/script-ext-html-webpack-plugin
       */
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),

      /*
       * Plugin: HtmlElementsPlugin
       * Description: Generate html tags based on javascript maps.
       *
       * If a publicPath is set in the webpack output configuration, it will be automatically added to
       * href attributes, you can disable that by adding a "=href": false property.
       * You can also enable it to other attribute by settings "=attName": true.
       *
       * The configuration supplied is map between a location (key) and an element definition object (value)
       * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
       *
       * Example:
       *  Adding this plugin configuration
       *  new HtmlElementsPlugin({
       *    headTags: { ... }
       *  })
       *
       *  Means we can use it in the template like this:
       *  <%= webpackConfig.htmlElements.headTags %>
       *
       * Dependencies: HtmlWebpackPlugin
       */
      new HtmlElementsPlugin({
        headTags: require('./head-config.common')
      }),

      new SassLintPlugin({
        configFile: '.sass-lint.yml',
        context: ['./src/app'],
        failOnWarning: true,
        failOnError: true
      }),

    /**
     * Plugin LoaderOptionsPlugin (experimental)
     *
     * See: https://gist.github.com/sokra/27b24881210b56bbaff7
     */
      new LoaderOptionsPlugin({
        debug: !isProd,
        options: {

          /**
           * Static analysis linter for TypeScript advanced options configuration
           * Description: An extensible linter for the TypeScript language.
           *
           * See: https://github.com/wbuchwalter/tslint-loader
           */
          tslint: {
            emitErrors: true,
            emitWarning: true,
            failOnHint: true,
            resourcePath: 'src'
          },

          //htmlhint: {
          //  configFile: '.htmlhintrc',
          //  emitError: true,
          //  emitWarning: true,
          //  failOnError: true,
          //  failOnWarning: true
          //},

          /**
           * Html loader advanced options
           *
           * See: https://github.com/webpack/html-loader#advanced-options
           */
          // TODO: Need to workaround Angular 2's html syntax => #id [bind] (event) *ngFor
          htmlLoader: htmlLoader,

        }
      }),

    ],

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    },

  };
}
