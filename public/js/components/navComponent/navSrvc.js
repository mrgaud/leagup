app.service('navSrvc',['$http',function($http){
    this.search = function(query){
        return $http.get('/search/'+query)
    }
}])
