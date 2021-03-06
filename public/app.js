const app = angular.module('leagup', ['ui.router'])
// import {fish} from 'js/scripts.js'
app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login_signup')

    $stateProvider
        .state('edit_profile', {
            url: '/edit_profile',
            templateUrl: '/views/edit_profile.html',
            controller: 'profileCtrl'
        })
        .state('login_signup', {
            url: '/login_signup',
            templateUrl: '/views/login_signup.html'
        })
        .state('profile', {
            url: '/user/:username',
            templateUrl: '/views/users_profile.html',
            controller: 'profileCtrl'
        })
        .state('team',{
            url:'/team/:id',
            templateUrl:'/views/team_page.html',
            controller:'teamCtrl'
        })
        .state('createTeam',{
            url:'/createTeam',
            templateUrl:'/views/create_team.html',
            controller:'teamCtrl'
        })
        .state('search',{
            url:'/search/:query',
            templateUrl:'/views/searchPage.html',
            controller:'navCtrl'
        })
        .state('edit_team',{
            url:'/edit_team/:admin/:team',
            templateUrl:'/views/edit_team.html',
            controller:'teamCtrl'
        })
        .state('pw_recover_setup',{
            url:'/pw_recover_setup',
            templateUrl:'views/pw_recovery_setup.html',
            controller:'profileCtrl'
        })
        .state('pw_recovery',{
            url:'/'+Math.floor(Math.random()*100000),
            templateUrl:'views/pw_recovery_page.html',
            controller:'profileCtrl'
        })
}])
