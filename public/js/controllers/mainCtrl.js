app.controller('mainCtrl', function($scope, $state, mainSrvc, profileSrvc, $location) {
    //checks email and pw and logs in user
    // ####################// ####################// ####################// ####################
    $scope.login = function(email, password) {
        let obj = {
            email: email,
            password: password
        }
        mainSrvc.login(obj).then(function(res) {
            res.data.games = JSON.parse(res.data.games)
            if (res.data.games) {
                res.data.gameNames = res.data.games.map(x => {
                    return x = x.name
                })
            }
            $scope.user = res.data
            // FIXME:

            $location.path(`/user/${$scope.user.username}`)
        }, (err) => {
            $scope.loginErr = "Email & Password don't match"
            $('#loginEmail').val('')
            $('#loginEmailDiv').addClass('has-error')
            $('#loginPassDiv').addClass('has-error')
            $('#loginPass').val('')
        })
    }
    //deletes user from angular record
    $scope.logout = function() {
        $scope.user = undefined
        mainSrvc.logout()
    }
    // ####################// ####################// ####################// ####################
    //create user
    $scope.createUser = function(username, email, password, passCheck) {
        $('.createUserMessage').slideDown(500)
        if (password === passCheck) {
            let obj = {
                username: username,
                email: email,
                password: password
            }
            if (username && email && password) {
                $('#createPassword').val('')
                $('#createPasswordCheck').val('')
                $('#createdUsername').val('')
                $()
                mainSrvc.createUser(obj).then(function(res) {}, function(err) {
                    $scope.err = 'Username or email address already in use'
                })
            }
        } else {
            $('#createPassword').val('')
            $('#pwdiv').addClass('has-error')
            $('#createPasswordCheck').val('')
            $('#pwcdiv').addClass('has-error')
            $scope.err = "Passwords do not match"
        }
    }
    //creates user message
    // $scope.createUserMessage = function(message) {
    //     let obj = {
    //         message: message,
    //         // FIXME: this little fucker
    //         user_id: $scope.profile.id,
    //         poster_id: $scope.user.id,
    //         poster_username: $scope.user.username,
    //         date: Date.now(),
    //         poster_image: $scope.user.image_url
    //     }
    //     mainSrvc.createUserMessage(obj)
    //     location.reload()
    // }
    // ####################// ####################// ####################// ####################
    //gets user data if logged in
    mainSrvc.getUser().then((res) => {
        if (res.data.username) {
            console.log(res.data);
            res.data.gameNames = res.data.games.map(x => x.name)
            $scope.user = res.data
        }
    }, (err) => {
        err ? '' : console.log('no err')
    })
    //grabs profile based on page you are on and displays it
    // $scope.getProfile = function() {
    //     let user = $location.url().replace('/user/', '')
    //     mainSrvc.getProfile(user).then(res => {
    //         $scope.profile = res.data
    //         $scope.profile.messages.map(x => x.readableDate = moment(x.date).format('MMM Do YYYY, hh:mm:ss a'))
    //         $scope.profile.messages.sort((x, y) => x.date < y.date)
    //         $scope.profile.games = JSON.parse($scope.profile.games)
    //         $scope.profile.likesId = $scope.profile.likes.map(x => x.poster_id)
    //         $scope.profile.dislikesId = $scope.profile.dislikes.map(x => x.poster_id)
    //         profileSrvc.chart($scope.profile)
    //     }, err => console.log(err))
    // }
    // ####################// ####################// ####################// ####################
})
