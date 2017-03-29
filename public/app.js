const app = angular.module('leagup', ['ui.router'])

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'profileCtrl'
        })
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
            controller: function($scope, $location) {
                let user = $location.url().replace('/user/', '')
                console.log(user);
                $(window).scrollTop(0)
                $scope.getProfile(user)
            }
        })
})
