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
    // Movie
    Route.get('movies', 'MovieController.index').as('getAllMovie')
    Route.get('movies/cached', 'MovieController.cache').as('getMovieCache')
    Route.get('movies/cached/featured/:limit', 'MovieController.cacheFeatured').as('getMovieCacheFeatured')
    Route.get('movies/cached/trending/:limit', 'MovieController.cacheTrending').as('getMovieCacheTrending')
    Route.get('movies/cached/popular/:limit', 'MovieController.cachePopular').as('getMovieCachePopular')
    Route.get('movie/:id', 'MovieController.show').as('showMovie')
    Route.get('movies/popular/:limit', 'MovieController.popular').as('getPopuler')
    Route.get('movies/trending/:limit', 'MovieController.trending').as('getTrending')
    Route.get('movies/search', 'MovieController.search').as('search')
    Route.get('movies/categories', 'MovieController.allCategory').as('categories')
    Route.get('movies/:category/:limit', 'MovieController.movieCategory').as('movieCategory')



    // Videos
    // Route.get('videos', 'VideoController.index').as('getAllMovie').middleware(['auth:jwt'])
    // Route.get('videos/cached', 'VideoController.cache').as('getMovieCache')
    // Route.get('videos/cached/featured', 'VideoController.cacheFeatured').as('getMovieCacheFeatured')
    // Route.get('videos/cached/trending', 'VideoController.cacheTrending').as('getMovieCacheTrending')
    // Route.get('videos/cached/popular', 'VideoController.cachePopular').as('getMovieCachePopular')
    // Route.get('video/:id', 'VideoController.show').as('showMovie').middleware(['auth:jwt'])
    // Route.get('videos/popular', 'VideoController.popular').as('getPopuler').middleware(['auth:jwt'])
    // Route.get('videos/trending', 'VideoController.trending').as('getTrending').middleware(['auth:jwt'])
    // Route.get('videos/search', 'VideoController.search').as('search').middleware(['auth:jwt'])
    // Route.get('movie/category/:id', 'VideoController.getCategory').as('getCategory').middleware(['auth:jwt'])
    // Route.get('movie/series/:id', 'VideoController.getSeries').as('getSeries').middleware(['auth:jwt'])

    // Route.post('addmovie', 'VideoController.insert').as('addMovie')


    // Users
    Route.get('profile', 'UserController.getProfile').as('getProfile').middleware(['auth:jwt'])    
    Route.get('islogged', 'UserController.isLoggin').as('checkLogin') 
    
    Route.post('profile/changepassword','UserController.changePassword').as('changePassword').middleware(['auth:jwt'])

    //Auth    
    Route.post('login', 'AuthController.login').as('login')
    Route.post('register','AuthController.register').as('register')
    Route.post('logout','AuthController.logout').as('logout').middleware(['auth'])


}).prefix('api/v1')

// Route.get('/', () => {
//   return { greeting: 'Hello world in JSON' }
// })
