app.service('mainSrvc', function($http) {
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
    // this.getProfile = function(user){
    //     return $http.get('/user/getProfile/'+user)
    // }
    this.logout = function(){
        $http.get('/user/logout')
    }
    // this.createUserMessage = function(message){
    //     $http.post('/user/userMessages',message).then(res=>{
    //         console.log(res);
    //     },err=>{
    //         console.log(err);
    //     })
    // }


})
