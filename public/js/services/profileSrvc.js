app.service('profileSrvc',['$http', function($http) {

    this.addPasswordRecovery = function(obj){
        return $http.post('/user/addPasswordRecovery', obj)
    }
    this.getPwRecovery = function(email){
        return $http.post('/user/getPwRecovery',{email})
    }
    this.checkAnswers = function(obj){
        return $http.post('/user/checkAnswers',obj)
    }
    this.submitNewPassword = function(pass, id){
        return $http.post('/user/submitNewPassword', {pass, id})
    }

    this.teamInvite = function(obj) {
        $http.post('team/teamInvite', obj)
    }
    this.acceptTeamInvite = function(obj) {
        $http.post('team/acceptTeamInvite', obj)
    }
    this.decilineTeamInvite = function(obj) {
        $http.post('team/declineTeamInvite', obj)
    }
    // ####################// ####################// ####################// ####################
    this.addLike = function(obj) {
        return $http.post('/user/addLike', obj)
    }
    this.addDislike = function(obj) {
        return $http.post('/user/addDislike', obj)
    }
    this.removeLike = function(obj) {
        $http.post('/user/removeLike', obj)
    }
    this.removeDislike = function(obj) {
        $http.post('/user/removeDislike', obj)
    }
    // ####################// ####################// ####################// ####################
    this.editProfile = function(obj) {
        return $http.patch('/user/edit_profile', obj)
    }
    this.getProfile = function(user) {
        return $http.get('/user/getProfile/' + user)
    }
    // ####################// ####################// ####################// ####################

    this.createUserMessage = function(message) {
        return $http.post('/user/userMessages', message)
    }

    // ####################// ####################// ####################// ####################
    this.upload = function(id) {
        var files = document.getElementById(id).files;
        var file = files[0];
        if (file === null) {
            alert('No file selected.');
            return;
        }
        get_signed_request(file);
    }

    function get_signed_request(file) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/s3_signed_url?file_name=' + file.name + '&file_type=' + file.type);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    upload_file(file, response.signed_request, response.url);
                } else alert('Could not get signed URL.');
            }
        };
        xhr.send();
    }

    function upload_file(file, signed_request, url) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', signed_request);
        xhr.setRequestHeader('x-amz-acl', 'public-read');
        xhr.onload = function() {
            if (xhr.status === 200) {
                document.getElementById('preview').src = url;
                console.log('file uploaded to:', url);
                this.url = url;
            }
        };
        xhr.onerror = function() {
            alert('Could not upload file.');
        };
        xhr.send(file);
    }
    // ####################// ####################// ####################// ####################
    this.games = [{
        name: 'DOTA2',
        image: '/assets/dota2.png'
    }, {
        name: 'LoL',
        image: '/assets/lollogo.png'
    }, {
        name: 'CSGO',
        image: '/assets/cslogo.png'
    }, {
        name: 'WoW',
        image: '/assets/wowlogo.png'
    }, {
        name: 'Halo',
        image: '/assets/halo.png'
    }, {
        name: 'Overwatch',
        image: '/assets/overwatchlogo.png'
    }]
    // ####################// ####################// ####################// ####################
    this.chart = function(profile) {

        var likeCounts = {};
        profile.likes.forEach(function(x) {
            likeCounts[moment(x.date).format('YYYYMMDD')] = (likeCounts[moment(x.date).format('YYYYMMDD')] || 0) + 1;
        });
        let likes = [];
        for (let o in likeCounts) {
            likes.push({
                x: o,
                y: likeCounts[o]
            })
        }
        var dislikeCounts = {};
        profile.dislikes.forEach(function(x) {
            dislikeCounts[moment(x.date).format('YYYYMMDD')] = (dislikeCounts[moment(x.date).format('YYYYMMDD')] || 0) + 1;
        })
        let dislikes = []
        for (let o in dislikeCounts) {
            dislikes.push({
                x: o,
                y: dislikeCounts[o]
            })
        }
        console.log(likes);
        var ctx = $('#myChart')
        var scatterChart = new Chart(ctx, {
            type: 'line',
            data: {
                label: 'days',
                datasets: [{
                        label: 'likes',
                        backgroundColor: "rgba(75,192,192,0.3)",
                        borderColor: "rgba(75,192,192,.5)",
                        data: likes,
                        tension: 0.2
                    },
                    {
                        label: 'dislikes',
                        data: dislikes,
                        backgroundColor: 'rgba(192,100,100,0.3)',
                        borderColor: 'rgba(192,100,100,.5)'
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            stepSize: 2,
                            beginAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                        // stacked:true
                    }],
                    xAxes: [{
                        type: 'time',
                        position: 'bottom',
                        time: {
                            unit: "day",
                            round: 'day'
                        },
                        gridLines: {
                            display: true
                        },
                        stacked: true
                    }]
                }
            }
        })
    }
    // ####################// ####################// ####################// ####################
}])




// $scope.games = [
//     "DOTA2",
//     "CSGO",
//     "WOW",
//     "LOL",
//     "HALO"
// ]
