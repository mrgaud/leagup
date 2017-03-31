app.service('teamSrvc',function($http){
    this.createTeam = function(obj){
        $http.post('/team/create_team',obj)
    }
})
