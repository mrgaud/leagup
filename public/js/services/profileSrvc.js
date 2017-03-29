app.service('profileSrvc',function($http){
    this.games = [
        {name:'DOTA2', image:'/assets/dota2.png'}
        ,{name:'LoL', image:'/assets/lollogo.png'}
        ,{name:'CSGO', image:'/assets/cslogo.png'}
        ,{name:'WoW', image:'/assets/wowlogo.png'}
        ,{name:'Halo', image:'/assets/halo.png'}
        ,{name:'Overwatch', image:'/assets/overwatchlogo.png'}
    ]
    this.editProfile = function(obj){
        $http.patch('/user/edit_profile',obj)
    }

})




// $scope.games = [
//     "DOTA2",
//     "CSGO",
//     "WOW",
//     "LOL",
//     "HALO"
// ]
