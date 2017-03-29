console.log(Date.now());
app.controller('profileCtrl', function($scope, profileSrvc) {
    $scope.games = profileSrvc.games;

    let checked = [];
    $(function() {
        $('input[type=checkbox]').on('change', function() {
            $('input[type=checkbox]:checked').each(function(index, checkbox) {
                checked.push($(checkbox).attr('id'));
            });
        });
    });
    console.log(checked);

    // var ctx = document.getElementById("myChart");
    // var myLineChart = new Chart(ctx, {
    //     type: 'line',
    //     data: [1, 2, 3, 4, 5]
    // });

})
