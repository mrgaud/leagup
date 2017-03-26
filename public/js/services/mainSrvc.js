app.service('mainSrvc', function($http) {
    this.login = function(credentials) {
        return $http.post('/auth/login', credentials)
    }
    this.getUser = function(){
        return $http.get('/currentUser')
    }
})
