app.controller('profileCtrl', function($scope, profileSrvc) {
    $scope.games = profileSrvc.games;
    $(function() {
        $('input[type=checkbox]').on('change', function() {
            var checked = [];
            $('input[type=checkbox]:checked').each(function(index, checkbox) {
                checked.push($(checkbox).attr('id'));
            });
        });
    });
    // var ctx = document.getElementById("myChart");
// console.log($scope.user, 'fizzle');
// var myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [{
//             label: '# likes per day',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//             borderColor: 'rgba(255,99,132,1)',
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });
})
