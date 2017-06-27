export default function () {
/* ============
 * Bootstrap
 * ============
 *
 * Require bootstrap.
 *
 * http://getbootstrap.com/
 */
  require('bootstrap');
  require('bootstrap/less/bootstrap.less');


/* ============
 * Font Awesome
 * ============
 *
 * Require font-awesome.
 *
 * http://http://fontawesome.io/
 */
  require('font-awesome/less/font-awesome.less');


/* ============
 * Styling
 * ============
 *
 * Require the application styling.
 * Stylus is used for this boilerplate.
 *
 * If you don't want to use Stylus, that's fine!
 * Replace the stylus directory with the CSS preprocessor you want.
 * Require the entry point here & install the webpack loader.
 *
 * It's that easy...
 *
 * http://stylus-lang.com/
 */
  require('./assets/sass/app.sass');
}
