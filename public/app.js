const app = angular.module('leagup', ['ui.router'])

app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/')

    $stateProvider
    .state('home',{
        url:'/',
        templateUrl:'views/home.html'
    })
    .state('login_signup',{
        url:'/login_signup',
        templateUrl:'/views/login_signup.html'
    })
})
