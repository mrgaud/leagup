app.service('teamSrvc',function($http, $state){
    this.createTeam = function(obj){
        $http.post('/team/create_team',obj)
    }
    this.getTeam = function(){
        return $http.get('/team/getTeam/'+$state.params.id)
    }
})
