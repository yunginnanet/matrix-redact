const sdk = require('matrix-js-sdk');
const argv = require('minimist')(process.argv.slice(2));
const config = require('./config.json');

const client = sdk.createClient({
  baseUrl: config.baseUrl,
  accessToken: config.accessToken,
  userId: config.userId
});

client.startClient();

client.once('sync', function (state, prevState, res) {
  console.log(state);
  
  client.getRoom(argv.r)
    .getTimelineSets()
    .forEach(set => {
      set.getTimelines().forEach(timeline => {
        function scanTImeline() {
          client.paginateEventTimeline(timeline, {backwards: true, limit: 1000}).then((a) => {
            timeline.getEvents().forEach(event => {
              if (event.event.sender == config.userId && (event.event.content.msgtype == "m.text" || event.event.content.msgtype == "m.image")) {
                console.log("Redacting event:")
                console.log(event.event.content.body)
                setTimeout(() => {
                  client.redactEvent(argv.r, event.event.event_id)
                }, 3000)
              }
            })
            if (a) {
              scanTImeline()
            } else {
              console.log("Finished redacting events.")
            }
          })
        }
        scanTImeline()
      })
    })
});
