const topics = {}
const hOP = topics.hasOwnProperty

export default {
  events: {
    MSG_ERROR: "MSG_ERROR",
    MSG_SUCCESS: "MSG_SUCCESS",
    SHOW_LOAD_ANIMATION: "SHOW_LOAD_ANIMATION",
    HIDE_LOAD_ANIMATION: "HIDE_LOAD_ANIMATION",
    REDIRECT: "REDIRECT",
  },

  publish(topic, info) {
    if (!hOP.call(topics, topic)) return

    topics[topic].forEach(function (item) {
      item(info != undefined ? info : {})
    })
  },

  subscribe(topic, listener) {
    if (!hOP.call(topics, topic)) topics[topic] = []

    const index = topics[topic].push(listener) - 1

    return {
      remove() {
        delete topics[topic][index]
      },
    }
  },
}

// PubSub Original
// const topics = {};
// const hOP = topics.hasOwnProperty;

// export default {
//   subscribe: function (topic, listener) {
//     // Create the topic's object if not yet created
//     if (!hOP.call(topics, topic)) topics[topic] = [];

//     // Add the listener to queue
//     var index = topics[topic].push(listener) - 1;

//     // Provide handle back for removal of topic
//     return {
//       remove: function () {
//         delete topics[topic][index];
//       },
//     };
//   },
//   publish: function (topic, info) {
//     // If the topic doesn't exist, or there's no listeners in queue, just leave
//     if (!hOP.call(topics, topic)) return;

//     // Cycle through topics queue, fire!
//     topics[topic].forEach(function (item) {
//       item(info != undefined ? info : {});
//     });
//   },
// };
