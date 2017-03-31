app.service('profileSrvc', function($http) {


    this.addLike = function(obj){
        $http.post('/user/addLike',obj)
    }

    this.editProfile = function(obj) {
        $http.patch('/user/edit_profile', obj)
    }

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
    this.chart = function() {
        $(document).ready(function() {
            var runChart = function() {
                let timer = setInterval(function() {
                    let profile = $('#prof').text()
                    if (profile.length) {
                        clearInterval(timer)
                        profile = JSON.parse(profile);

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
                                            tension: 1
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
                                                unit: "day",
                                                round: 'day'
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




// $scope.games = [
//     "DOTA2",
//     "CSGO",
//     "WOW",
//     "LOL",
//     "HALO"
// ]
