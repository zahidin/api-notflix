'use strict'

const Database = use('Database')
const ModelVideo = use('App/Models/Video')

class VideoController {

    async index({request, response}) {
        const videos = await Database.table('videos').select('*');

    
        response.json(videos)

    }

    async popular({request, response}) {

        const videosPop = await Database.table('videos').where('is_popular', '1');
        
        response.json(videosPop)
    }

    async trending({request, response}) {
        const videosTrend = await Database.table('videos').where('is_trending', '1');

        response.json(videosTrend)
    }

    async getCategory ({ request,params, response }) {
        // const dataCategory = await Database.table('videos').innerJoin('categories','videos.category_id','categories.id').where('videos.id', params.id)
        const dataCategory = await Database.select('videos.*','categories.title as category_title').from('videos').innerJoin('categories','videos.category_id','categories.id').where('videos.id', params.id)
        response.json(dataCategory)
    }

    async getSeries ({ request,params, response }) {
        const dataSeries = await Database.select('videos.*','series.title as series_title').from('videos').innerJoin('series','videos.category_id','series.id').where('videos.id', params.id)
        response.json(dataSeries)
    }
  
}

module.exports = VideoController