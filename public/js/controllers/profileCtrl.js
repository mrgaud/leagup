console.log(Date.now());
app.controller('profileCtrl', function($scope, profileSrvc, $location, $state) {

    $scope.games = profileSrvc.games;
    //grabs profile based on page you are on and displays it
    $scope.getProfile = function() {
        let user = $location.url().replace('/user/', '')
        profileSrvc.getProfile(user).then(res => {
            $scope.profile = res.data
            $scope.profile.messages.map(x => x.readableDate = moment(x.date).format('MMM Do YYYY, hh:mm:ss a'))
            $scope.profile.messages.sort((x, y) => x.date < y.date)
            $scope.profile.games = JSON.parse($scope.profile.games)
            $scope.profile.likesId = $scope.profile.likes.map(x => x.poster_id)
            $scope.profile.dislikesId = $scope.profile.dislikes.map(x => x.poster_id)
            profileSrvc.chart($scope.profile)
        }, err => console.log(err))
    }
    //##########################//##########################//##########################
    if ($location.url() === '/edit_profile' && !$scope.user) {
        $location.path('login_signup')
    }
    //##########################//##########################//##########################
    $scope.editProfile = function(description,url) {
        let checked = []
        $('input[type=checkbox]:checked').each(function(index, checkbox) {
            checked.push($(checkbox).attr('id'));
        });
        checked = checked.map(x => {
            for (let i = 0; i < $scope.games.length; i++) {
                if ($scope.games[i].name === x) {
                    return x = $scope.games[i]
                }
            }
        })
        console.log(url);
        if ((document.getElementById('preview').src).includes('leag')) {
            image = document.getElementById('preview').src;
        }else if(url){
            image = url
            console.log(image);
        }else{
            image = $scope.user.image_url
        }
        console.log(image);
        let obj = {
            image:image || $scope.user.image_url,
            description: description || $scope.user.description,
            games: checked.length ? checked : $scope.user.games
        }
        console.log(obj);
        profileSrvc.editProfile(obj)
        $location.path('/user/' + $scope.user.username)
        location.reload()
    }
    //##########################//##########################//##########################
    $scope.upload = function(id) {
        profileSrvc.upload(id)
    }
    //##########################//##########################//##########################
    let user = $location.url().replace('/user/', '')
    $(window).scrollTop(0)
    $scope.getProfile(user)
    //##########################//##########################//##########################

    //##########################//##########################//##########################
    // NOTE: Controlls the likes/dislikes
    $scope.addLike = function(prof, user) {
        let obj = {
            user_id: prof,
            poster_id: user,
            date: Date.now()
        }
        if ($scope.profile.dislikesId.includes(user)) {
            profileSrvc.removeDislike(obj)
        }
        profileSrvc.addLike(obj)
        $scope.getProfile()
    }
    $scope.addDislike = function(prof, user) {
        let obj = {
            user_id: prof,
            poster_id: user,
            date: Date.now()
        }
        if ($scope.profile.likesId.includes(user)) {
            profileSrvc.removeLike(obj)
        }
        profileSrvc.addDislike(obj)
        $scope.getProfile()
    }
    //##########################//##########################//##########################

    $scope.createUserMessage = function(message) {
        let obj = {
            message: message,
            // FIXME: this little fucker
            user_id: $scope.profile.id,
            poster_id: $scope.user.id,
            poster_username: $scope.user.username,
            date: Date.now(),
            poster_image: $scope.user.image_url
        }
        profileSrvc.createUserMessage(obj)
        $scope.comment = ''
        $scope.getProfile()
    }
})
