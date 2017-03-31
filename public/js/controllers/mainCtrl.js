app.controller('mainCtrl', function($scope, $state, mainSrvc, $location) {
    //checks email and pw and logs in user

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
                mainSrvc.createUser(obj).then(function(res) {
                }, function(err) {
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
    // FIXME: user_id needs to be fixxed
    $scope.createUserMessage = function(message) {
        let obj = {
            message: message,
            // FIXME: this little fucker
            user_id: $scope.profile.id,
            poster_id: $scope.user.id,
            poster_username: $scope.user.username,
            date: Date.now(),
            poster_image: $scope.user.imageUrl
        }
        mainSrvc.createUserMessage(obj)
        console.log(obj);
        location.reload()
    }
    //gets user data if logged in
    mainSrvc.getUser().then((res) => {
        if (res.data.username) {
            $scope.user = res.data
            mainSrvc.getUserMessages().then(res => {
                $scope.userMessages = res.data
                $scope.userMessages.map(x => {
                    x.readableDate = moment(x.date).format("MMM Do YYYY, h:mm:ss a")
                })
            })
        } else {
            console.log('here');
        }
    }, (err) => {
        err ? '' : console.log('no err')
    })
    //grabs profile based on page you are on and displays it
    $scope.getProfile = function() {
        let user = $location.url().replace('/user/', '')

        mainSrvc.getProfile(user).then(res => {
            $scope.profile = res.data
            $scope.profile.messages.map(x => x.readableDate = moment(x.date).format('MMM Do YYYY, hh:mm:ss a'))
            $scope.profile.messages.sort((x, y) => x.date < y.date)
            $scope.profile.games = JSON.parse($scope.profile.games)
        }, err => console.log(err))
    }
})
