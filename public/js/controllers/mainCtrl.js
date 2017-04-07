app.controller('mainCtrl', ['$scope', '$state','mainSrvc','profileSrvc','$location', function($scope, $state, mainSrvc, profileSrvc, $location) {
    //checks email and pw and logs in user
    // ####################// ####################// ####################// ####################
    // ####################// ####################// ####################// ####################
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
            console.log($scope.user);
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
        console.log('logging out');
        $scope.user = undefined
        mainSrvc.logout()
    }
    // ####################// ####################// ####################// ####################
    //create user
    $scope.createUser = function(username, email, password, passCheck) {
        if (password === passCheck) {
            let obj = {
                username: username,
                email: email,
                password: password
            }
            if (username && email && password) {
                mainSrvc.createUser(obj).then(function(res) {
                    $scope.login(email,password)
                }, function(err) {
                    $scope.err = 'Username or email address already in use'
                    $scope.username = ''
                    $scope.password = ''
                    $scope.email = ''
                    $scope.username = ''
                    $('.err').show()
                })

            }
        } else {
            $('#createPassword').val('')
            $('#pwdiv').addClass('has-error')
            $('#createPasswordCheck').val('')
            $('#pwcdiv').addClass('has-error')
            $scope.err = "Passwords do not match"
            $('.err').show()
        }
    }
    // ####################// ####################// ####################// ####################
    //gets user data if logged in
    mainSrvc.getUser().then((res) => {
        if (res.data.username) {
            console.log(res.data);
            if(res.data.games){
                res.data.gameNames = res.data.games.map(x => x.name)
            }
            $scope.user = res.data
        }
    }, (err) => {
        err ? '' : console.log('no err')
    })
    // ####################// ####################// ####################// ####################
}])
