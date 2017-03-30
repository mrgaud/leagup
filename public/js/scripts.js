// $(document).ready(function() {
//     var runChart = function() {
//         let timer = setInterval(function() {
//             console.log('hello');
//             let profile = $('#prof').text()
//             if (profile.length) {
//                 clearInterval(timer)
//                 profile = JSON.parse(profile);
//                 // ############################################################################################################
//                 likedates = profile.likes.map(x => {
//                     return x.date = moment(x.date).format("MMM Do YY")
//                 })
//
//                 var counts = {};
//                 likedates.forEach(function(x) {
//                     counts[x] = (counts[x] || 0) + 1;
//                 });
//                 arrCounts = []
//                 for (let o in counts) {
//                     arrCounts.push(counts[o])
//                 }
//                 likedates = Array.from(new Set(likedates))
//                 // ############################################################################################################
//                 if (profile.dislikes) {
//
//                     dislikedates = profile.dislikes.map(x => {
//                         return x.date = moment(x.date).format("MMM Do YY")
//                     })
//                 }
//
//                 function chart() {
//                     var ctx = $('#myChart')
//                     var scatterChart = new Chart(ctx, {
//                         type: 'line',
//                         data: {
//                             labels: likedates,
//                             datasets: [{
//                                     label: 'likes',
//                                     backgroundColor: "rgba(75,192,192,0.4)",
//                                     borderColor: "rgba(75,192,192,1)",
//                                     data: arrCounts,
//                                     borderCapStyle: "butt"
//                                 },
//                                 {
//                                     label: 'dislikes',
//                                     data: [],
//                                     backgroundColor: 'rgba(192,100,100,0.4)',
//                                     borderColor: 'rgba(192,100,100,1)'
//                                 }
//                             ]
//                         },
//                         options: {
//                             scales: {
//                                 yAxes: [{
//                                     stacked: false
//                                 }]
//                             }
//                         }
//                     });
//                 }
//                 chart()
//
//
//             }
//         }, 1000)
//     }
//     // runChart()
// })
