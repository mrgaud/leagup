app.service('mainSrvc', ['$http',function($http) {
    this.login = function(credentials) {
        return $http.post('/login', credentials)
    }
    // this.getUserMessages = function(){
    //     return $http.get('/user/userMessages')
    // }
    this.createUser = function(obj){
        return $http.post('/user/create', obj)
    }
    this.getUser = function(){
        return $http.get('/user/currentUser')
    }
    this.logout = function(){
        $http.get('/user/logout').then(res=>{console.log(res)},err=>'logged out')
    }
}])
