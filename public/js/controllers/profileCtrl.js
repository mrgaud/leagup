console.log(Date.now());
app.controller('profileCtrl', function($scope, profileSrvc, $location, $state) {

    $scope.games = profileSrvc.games;

    if ($location.url() === '/edit_profile' && !$scope.user) {
        console.log('working');
        $location.path('login_signup')
    }

    $scope.editProfile = function(description) {
        let checked = []
        $('input[type=checkbox]:checked').each(function(index, checkbox) {
            checked.push($(checkbox).attr('id'));
        });
        checked = checked.map(x => {
            for (let i = 0; i < $scope.games.length; i++) {
                if ($scope.games[i].name === x) {
                    return x = $scope.games[i]
                }
            }
        })
        let obj = {
            description: description || $scope.user.description,
            games: checked.length ? checked : $scope.user.games
        }
        profileSrvc.editProfile(obj)
        $location.path('/user/'+$scope.user.username)
    }

    let user = $location.url().replace('/user/', '')
    $(window).scrollTop(0)
    $scope.getProfile(user)

    if ($state.current.name === 'profile') {
        $(document).ready(function() {
            var runChart = function() {
                let timer = setInterval(function() {
                    console.log('hello');
                    let profile = $('#prof').text()
                    if (profile.length) {
                        clearInterval(timer)
                        profile = JSON.parse(profile);
                        console.log(profile);

                        date = profile.likes.map(x => {
                            x.x = moment(x.date).format("MM DD YYYY")
                            return {
                                x: x.date,
                                z: moment(x.date).format("MM DD YYYY"),
                                y: 0
                            }
                        })
                        date = date.map(f => {
                            for (let i = 0; i < date.length; i++) {
                                if (date[i].z === f.z) {
                                    f.y += 1
                                }
                            }
                            return f 
                        })

                        function chart() {
                            var ctx = $('#myChart')
                            var scatterChart = new Chart(ctx, {
                                type: 'line',
                                data: {
                                    label: 'days',
                                    datasets: [{
                                            label: 'likes',
                                            backgroundColor: "rgba(75,192,192,0.0)",
                                            borderColor: "rgba(75,192,192,1)",
                                            data: date,
                                        },
                                        {
                                            label: 'dislikes',
                                            // data: ,
                                            backgroundColor: 'rgba(192,100,100,0.0)',
                                            borderColor: 'rgba(192,100,100,1)'
                                        }
                                    ]
                                },
                                options: {
                                    scales: {
                                        yAxes: [{
                                            type: 'linear',
                                            display: true,
                                            gridLines: {
                                                display: false
                                            }
                                            // position:'bottom',
                                        }],
                                        xAxes: [{
                                            type: 'time',
                                            display: true,
                                            time: {
                                                // unit:"day",
                                                round: 'day'
                                            },
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Date'
                                            },
                                            gridLines: {
                                                display: false
                                            }
                                        }]

                                    }
                                }
                            });
                        }
                        chart()
                    }
                }, 300)
            }
            runChart()
        })
    }



})
