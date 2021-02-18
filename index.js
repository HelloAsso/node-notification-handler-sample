const fs = require('fs');
const fastify = require('fastify')()

fastify.register(require('point-of-view'), {
    engine: {
        ejs: require('ejs')
    }
})

// Display dashboard of notification by reading 'notification' file
fastify.get('/', (request, reply) => {
    var data = fs.readFileSync('notification')

    // Split file by line
    // Remove empty item
    // Pretty json
    // Reverse order
    var json = data.toString().split('\n').filter(String).map((line) => {
        var tmp = JSON.parse(line)
        tmp.data = JSON.stringify(JSON.parse(tmp.data), null, 2) // string to json to string pretty, is this ugly ? for sure it's sample
        return tmp
    }).reverse()

    reply.view('/templates/index.ejs', { results: json })
})

// Receive notification and store to 'notification' file
fastify.post('/', (request, reply) => {
    var json = request.body

    // This is here where you can add your own logic
    // You can get all data from json.data. ...
    
    var model = JSON.stringify({
        date: new Date(), 
        type: json.eventType, 
        data: JSON.stringify(json)
    });

    fs.appendFileSync('notification', model + '\n')

    reply.code(200)
    return ''
})

fastify.listen(5000, (err, address) => {
    if (err) throw err
    fastify.log.info(`server listening on ${address}`)
})