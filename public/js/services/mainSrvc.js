app.service('mainSrvc',function($http){
    this.login = function(credentials){
        $http.post('/login',credentials)
    }
})
