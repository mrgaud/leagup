app.service('mainSrvc', function($http) {
    this.login = function(credentials) {
        return $http.post('/login', credentials)
    }
    this.createUser = function(obj){
        $http.post('/create',obj)
    }
    this.getUser = function(){
        return $http.get('/user/currentUser')
    }


})
