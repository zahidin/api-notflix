'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.get('movie/:id', 'VideoController.getCategory').as('getCategory').middleware(['auth:jwt'])
    Route.get('movie/series/:id', 'VideoController.getSeries').as('getSeries').middleware(['auth:jwt'])

    // Videos
    Route.get('/movies', 'VideoController.index').as('allMovies')
    Route.get('/movies/popular', 'VideoController.popular').as('popularMovies')
    Route.get('/movies/trending', 'VideoController.trending').as('trendingMovies')
    Route.get('/movies/:id', 'VideoController.idvideo').as('showMovie')

    Route.post('login', 'AuthController.login').as('loginJwt')
    Route.post('register', 'AuthController.register').as('registerJwt')

}).prefix('api/v1')

// Route.get('/', () => {
//   return { greeting: 'Hello world in JSON' }
// })
