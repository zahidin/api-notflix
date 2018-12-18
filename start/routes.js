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

    // Videos
    Route.get('movies', 'VideoController.index').as('getAllMovie').middleware(['auth:jwt'])
    Route.get('movie/:id', 'VideoController.show').as('showMovie').middleware(['auth:jwt'])
    Route.get('movies/popular', 'VideoController.popular').as('getPopuler').middleware(['auth:jwt'])
    Route.get('movies/trending', 'VideoController.trending').as('getTrending').middleware(['auth:jwt'])
    // Route.get('movie/category/:id', 'VideoController.getCategory').as('getCategory').middleware(['auth:jwt'])
    // Route.get('movie/series/:id', 'VideoController.getSeries').as('getSeries').middleware(['auth:jwt'])

    Route.post('addmovie', 'VideoController.insert').as('addMovie')


    // Users
    Route.get('profile', 'UserController.getProfile').as('getProfile').middleware(['auth:jwt'])    

    //Auth    
    Route.post('login', 'AuthController.login').as('login')
    Route.post('register','AuthController.register').as('register')
    Route.post('logout','AuthController.logout').as('logout').middleware(['auth'])


}).prefix('api/v1')

// Route.get('/', () => {
//   return { greeting: 'Hello world in JSON' }
// })
