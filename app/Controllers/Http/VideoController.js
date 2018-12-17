'use strict'

const Video = use('App/Models/Video')
const Database = use ('Database')

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
}

module.exports = VideoController