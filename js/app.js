const app = angular.module('leagup',['ui.router'])
app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('home',{
        url:'/',
        templateUrl:'views/home.html'
    })
    .state('about',{
        url:'/about',
        templateUrl:'views/about.html'
    })

    $urlRouterProvider.otherwise('/')
})
