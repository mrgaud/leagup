app.service('navSrvc',function($http){
    this.search = function(query){
        return $http.get('/search/'+query)
    }
})
