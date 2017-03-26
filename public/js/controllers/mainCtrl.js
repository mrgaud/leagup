app.controller('mainCtrl',function($scope, mainSrvc){
    $scope.login=function(email,password){
        let obj = {
            email:email,
            password:password
        }
        mainSrvc.login(obj)
    }
})
