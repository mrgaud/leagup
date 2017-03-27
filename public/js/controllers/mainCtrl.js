app.controller('mainCtrl', function($scope, mainSrvc,$location) {

    $scope.login = function(email, password) {
        let obj = {
            email: email,
            password: password
        }
        mainSrvc.login(obj).then(function(res) {
            $scope.user = res.data
        })
        $location.path('home')
    }

    mainSrvc.getUser().then((res)=>{
        if(res.data.username){
            console.log('here too');
            $scope.user = res.data
        }
        else{
            console.log('here');
            $location.path('login_signup')
        }
    },(err)=>{err?$location.path('login_signup'):console.log('no err')})
})
