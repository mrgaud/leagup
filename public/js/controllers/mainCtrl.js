app.controller('mainCtrl', function($scope, mainSrvc, $location) {

    $scope.login = function(email, password) {
        let obj = {
            email: email,
            password: password
        }
        mainSrvc.login(obj).then(function(res) {
            res.data.games = JSON.parse(res.data.games)
            res.data.teams = JSON.parse(res.data.teams)
            $scope.user = res.data
            console.log(res.data);
            $location.path('home')
        }, (err) => {
            $scope.loginErr = "Email & Password don't match"
            $('#loginEmail').val('')
            $('#loginEmailDiv').addClass('has-error')
            $('#loginPassDiv').addClass('has-error')
            $('#loginPass').val('')
        })
    }
    $scope.logout = function(){
        $scope.user = undefined
        mainSrvc.logout()
    }
    $scope.createUser = function(username, email, password, passCheck) {
        if (password === passCheck) {
            let obj = {
                username: username,
                email: email,
                password: password
            }
            if (username && email && password) {
                mainSrvc.createUser(obj).then(function(res) {
                    $location.path('home')
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
    mainSrvc.getUser().then((res) => {
        if (res.data.username) {
            console.log('here too');
            $scope.user = res.data
            console.log($scope.user);
        } else {
            console.log('here');
            $location.path('login_signup')
        }
    }, (err) => {
        err ? $location.path('login_signup') : console.log('no err')
    })
})
