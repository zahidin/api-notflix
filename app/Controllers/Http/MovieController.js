'use strict'

const Database = use('Database')
const Redis = use('Redis')
const ModelVideo = use('App/Models/Video')

class MovieController {
    async index({request,response}) {

        const movies = await Database.table('movies').select('*');
        // const dataCategory = await Database.select('movies.*','categories.title as category_title','series.title as series_title').from('movies').innerJoin('categories','movies.category_id','categories.id').innerJoin('series','movies.series_id','series.id')
        response.json(movies)    
    }

    async popular({request, response}) {

        const moviesPop = await Database.table('movies').orderBy('views','asc').limit('4');
        response.json(moviesPop)
    }

    async trending({request, response}) {

        const moviesTrend = await Database.table('movies').where('rating', 'like', '%7,%').limit('4');
        response.json(moviesTrend)

    }

    async show({request, response, params}) {

        // const dataCategory = await Database.select('movies.*','categories.title as category_title','series.title as series_title').from('movies').innerJoin('categories','movies.category_id','categories.id').innerJoin('series','movies.series_id','series.id').where('movies.id', params.id)
        const moviesId = await Database.table('movies').where('id',params.id);
        response.json(moviesId)
    }

    async search({ request, response, params }) {
        let search = request.input('q')
        const search = await Database
            .table('movies')
            .where('title', 'like', '%'+search+'%')

        response.json(search)
    }

    async cache({request, response}){

        const cachedMovies = await Redis.get('movies')
        // const cachedMoviesTrending = await Redis.get('trending')
        // const cachedMoviesPopular = await Redis.get('popular')
        if(cachedMovies){
            return JSON.parse(cachedMovies)
        }
        // const movies = await Database.select('movies.*','categories.title as category_title','series.title as series_title').from('movies').innerJoin('categories','movies.category_id','categories.id').innerJoin('series','movies.series_id','series.id')
        let moviesFeatured = await Database.table('movies').where('rating', 'like', '%8,%').limit('3')
        moviesFeatured = JSON.stringify(moviesFeatured)
        let moviesPop = await Database.table('movies').orderBy('views','asc').limit('4');
        moviesPop = JSON.stringify(moviesPop)
        let moviesTrend = await Database.table('movies').where('rating', 'like', '%7,%').limit('4');
        moviesTrend = JSON.stringify(moviesTrend)
        const all = `{"featured":${moviesFeatured},"popular":${moviesPop},"trending":${moviesTrend}}`

        // await Redis.set('movies',JSON.stringify(all),'EX',600000)   
        await Redis.set('movies',JSON.stringify(all),'EX',300000)   
        // await Redis.set('popular',JSON.stringify(moviesPop))
        // await Redis.set('trending',JSON.stringify(moviesTrend))
        response.json(all)
    }

    async cacheFeatured({request,response}){
        const cachedFeatured = await Redis.get('featured')
        if(cachedFeatured){
            return JSON.parse(cachedFeatured)
        }
        let moviesFeatured = await Database.table('movies').where('rating', 'like', '%8,%').limit('3')
        moviesFeatured = JSON.stringify(moviesFeatured)
        await Redis.set('featured',JSON.stringify(moviesFeatured),'EX',300000)   
        response.json(moviesFeatured)

    }

    async cacheTrending({request,response}){
        const cachedTreding = await Redis.get('trending')
        if(cachedTreding){
            return JSON.parse(cachedTreding)
        }

        let moviesTrend = await Database.table('movies').where('rating', 'like', '%7,%').limit('4');
        moviesTrend = JSON.stringify(moviesTrend)
        await Redis.set('trending',JSON.stringify(moviesTrend),'EX',300000)   
        response.json(moviesTrend)

    }

    async cachePopular({request,response}){
        const cachedPopular = await Redis.get('popular')
        if(cachedPopular){
            return JSON.parse(cachedPopular)
        }
        let moviesPop = await Database.table('movies').orderBy('views','asc').limit('4');
        moviesPop = JSON.stringify(moviesPop)
        await Redis.set('popular',JSON.stringify(moviesPop),'EX',300000)   
        response.json(moviesPop)
    }
}

module.exports = MovieController
