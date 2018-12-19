'use strict'

const Database = use('Database')
const Redis = use('Redis')
const ModelVideo = use('App/Models/Video')

class VideoController {

    async index({request,response}) {

        // const videos = await Database.table('videos').select('*');
        const dataCategory = await Database.select('videos.*','categories.title as category_title','series.title as series_title').from('videos').innerJoin('categories','videos.category_id','categories.id').innerJoin('series','videos.series_id','series.id')
        response.json(dataCategory)    
    }

    async popular({request, response}) {

        const videosPop = await Database.table('videos').where('is_popular', '1');
        response.json(videosPop)
    }

    async trending({request, response}) {

        const videosTrend = await Database.table('videos').where('is_trending', '1');
        response.json(videosTrend)

    }

    async show({request, response, params}) {

        const dataCategory = await Database.select('videos.*','categories.title as category_title','series.title as series_title').from('videos').innerJoin('categories','videos.category_id','categories.id').innerJoin('series','videos.series_id','series.id').where('videos.id', params.id)
        response.json(dataCategory)
    }

    async cache({request, response}){
        // blm kelar
        const cachedMovies = await Redis.get('videos')
        // const cachedMoviesTrending = await Redis.get('trending')
        // const cachedMoviesPopular = await Redis.get('popular')
        if(cachedMovies){
            return JSON.parse(cachedMovies)
        }

        const movies = await Database.select('videos.*','categories.title as category_title','series.title as series_title').from('videos').innerJoin('categories','videos.category_id','categories.id').innerJoin('series','videos.series_id','series.id')
        let videosPop = await Database.table('videos').where('is_popular', '1');
        videosPop = JSON.stringify(videosPop)
        let videosTrend = await Database.table('videos').where('is_trending', '1');
        videosTrend = JSON.stringify(videosTrend)
        const all = `{"popular":${videosPop},"trending":${videosTrend}}`

        // await Redis.set('videos',JSON.stringify(all),'EX',600000)   
        await Redis.set('videos',JSON.stringify(all),'EX',300000)   
        // await Redis.set('popular',JSON.stringify(videosPop))
        // await Redis.set('trending',JSON.stringify(videosTrend))
        return all
    }

    async search({request,params,response}){
        let req = params.search
        console.log(req)

        // let dataSearch = await ModelVideo.query().where('title', 'like', '%' + req + '%')
        //     .orWhere('vide_embed', 'like', '%' + req + '%').fetch()

        // const dataSearch = await Database.raw("select * from videos where title like %?%",[request.get('search')])
        response.json(req)
    }

    async insert({request, response, params}){
        
        try{
            const {episode,series_id,title,image_url,starring,category_id,imdb_score,video_embed,video_url,is_trending,is_popular} = request.all()
            const video = new ModelVideo()
    
            video.episode = episode
            video.series_id = series_id
            video.title = title
            video.image_url = image_url
            video.starring = starring
            video.category_id = category_id
            video.imdb_score = imdb_score
            video.video_embed = video_embed
            video.video_url = video_url
            video.is_trending = is_trending
            video.is_popular = is_popular
            await video.save()            
            response.json({success:true,message:"Add video success"})
        }catch(e){
            response.json({success:true,message:e.message})
        }
    }

    // async getCategory ({ request,params, response }) {
    //     // const dataCategory = await Database.table('videos').innerJoin('categories','videos.category_id','categories.id').where('videos.id', params.id)
    //     const dataCategory = await Database.select('videos.*','categories.title as category_title').from('videos').innerJoin('categories','videos.category_id','categories.id').where('videos.id', params.id)
    //     response.json(dataCategory)
    // }

    // async getSeries ({ request,params, response }) {
    //     const dataSeries = await Database.select('videos.*','series.title as series_title').from('videos').innerJoin('series','videos.category_id','series.id').where('videos.id', params.id)
    //     response.json(dataSeries)
    // }
  
}

module.exports = VideoController