app.controller('profileCtrl', function($scope, profileSrvc) {
    $scope.games = profileSrvc.games;

    $(function() {
        $('input[type=checkbox]').on('change', function() {
            var checked = [];
            $('input[type=checkbox]:checked').each(function(index, checkbox) {
                checked.push($(checkbox).attr('id'));
            });
        });
        return checked
    });

})
