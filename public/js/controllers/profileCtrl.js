app.controller('profileCtrl', function($scope, profileSrvc, $location, $state) {

    $('[data-toggle="popover"]').popover()
    $scope.games = profileSrvc.games;
    //grabs profile based on page you are on and displays it
    $scope.getProfile = function() {
        let user = $location.url().replace('/user/', '')
        profileSrvc.getProfile(user).then(res => {
            $scope.profile = res.data
            $scope.profile.messages.map(x => x.readableDate = moment(x.date).format('MMM Do YYYY, hh:mm:ss a'))
            $scope.profile.messages.map(x => x.readableDate = moment(x.date).format('MMM Do YYYY, hh:mm:ss a'))
            $scope.profile.messages.sort((x, y) => x.date < y.date)
            $scope.profile.games = JSON.parse($scope.profile.games)
            $scope.profile.likesId = $scope.profile.likes.map(x => x.poster_id)
            $scope.profile.dislikesId = $scope.profile.dislikes.map(x => x.poster_id)
            $scope.profile.teamNames = $scope.profile.teams.map(x => x.team_name)
            profileSrvc.chart($scope.profile)
            console.log($scope.profile);
        }, err => console.log(err))
    }
    //##########################//##########################//##########################
    //##########################//##########################//##########################
    //##########################//##########################//##########################

    if ($location.url() === '/edit_profile' && !$scope.user) {
        $location.path('login_signup')
    }
    //##########################//##########################//##########################
    //##########################//##########################//##########################
    //##########################//##########################//##########################
    $scope.editProfile = function(description, url) {
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
        } else if (url) {
            image = url
        } else {
            image = $scope.user.image_url
        }
        let obj = {
            image: image || $scope.user.image_url,
            description: description || $scope.user.description,
            games: checked.length ? checked : $scope.user.games
        }
        profileSrvc.editProfile(obj)
        $location.path('/user/' + $scope.user.username)
        location.reload()
    }
    //##########################//##########################//##########################
    //##########################//##########################//##########################
    //##########################//##########################//##########################
    $scope.upload = function(id) {
        profileSrvc.upload(id)
    }
    //##########################//##########################//##########################
    //##########################//##########################//##########################
    //##########################//##########################//##########################
    let user = $location.url().replace('/user/', '')
    $(window).scrollTop(0)
    $scope.getProfile(user)
    //##########################//##########################//##########################
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
        profileSrvc.addLike(obj).then(res=>{
            $scope.getProfile()
        },err=>console.log(err))
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
        profileSrvc.addDislike(obj).then(res=>{
            $scope.getProfile()
        },err=>console.log(err))
    }
    //##########################//##########################//##########################
    //##########################//##########################//##########################
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
        profileSrvc.createUserMessage(obj).then(res=>{
            $scope.getProfile()
            $scope.comment = ''
        })
        // console.log("hit me baby");
        // $scope.profile.messages.push(obj)
    }
    //##########################//##########################//##########################
    //##########################//##########################//##########################
    //##########################//##########################//##########################

    $scope.teamInvite = function(team_id, team_admin, team_privacy) {
        console.log($scope.user.id, $scope.profile.id, team_id, team_admin);
        if (team_admin !== $scope.user.id && team_privacy > 1) {
            alert('You don\'t have nessessary premissions to do that')
            return
        }
        let obj = {
            invited: $scope.profile.id,
            inviter: $scope.user.id,
            team: team_id
        }
        profileSrvc.teamInvite(obj)
    }
    //##########################//##########################//##########################
    //##########################//##########################//##########################
    //##########################//##########################//##########################
    $scope.acceptTeamInvite = function(invited, team) {
        let obj = {
            invited: invited,
            team: team
        }
        profileSrvc.acceptTeamInvite(obj)
        $scope.getProfile()
    }
    $scope.declineTeamInvite = function(invited, team) {
        let obj = {
            invited: invited,
            team: team
        }
        profileSrvc.decilineTeamInvite(obj)
        $scope.getProfile()
    }
})
