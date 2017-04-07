"use strict";var app=angular.module("leagup",["ui.router"]);app.config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/login_signup"),e.state("edit_profile",{url:"/edit_profile",templateUrl:"/views/edit_profile.html",controller:"profileCtrl"}).state("login_signup",{url:"/login_signup",templateUrl:"/views/login_signup.html"}).state("profile",{url:"/user/:username",templateUrl:"/views/users_profile.html",controller:"profileCtrl"}).state("team",{url:"/team/:id",templateUrl:"/views/team_page.html",controller:"teamCtrl"}).state("createTeam",{url:"/createTeam",templateUrl:"/views/create_team.html",controller:"teamCtrl"}).state("search",{url:"/search/:query",templateUrl:"/views/searchPage.html",controller:"navCtrl"}).state("edit_team",{url:"/edit_team/:admin/:team",templateUrl:"/views/edit_team.html",controller:"teamCtrl"}).state("pw_recover_setup",{url:"/pw_recover_setup",templateUrl:"views/pw_recovery_setup.html",controller:"profileCtrl"}).state("pw_recovery",{url:"/"+Math.floor(1e5*Math.random()),templateUrl:"views/pw_recovery_page.html",controller:"profileCtrl"})}]),app.controller("mainCtrl",["$scope","$state","mainSrvc","profileSrvc","$location",function(e,t,a,r,n){e.login=function(t,r){var o={email:t,password:r};a.login(o).then(function(t){t.data.games=JSON.parse(t.data.games),t.data.games&&(t.data.gameNames=t.data.games.map(function(e){return e=e.name})),e.user=t.data,console.log(e.user),n.path("/user/"+e.user.username)},function(t){e.loginErr="Email & Password don't match",$("#loginEmail").val(""),$("#loginEmailDiv").addClass("has-error"),$("#loginPassDiv").addClass("has-error"),$("#loginPass").val("")})},e.logout=function(){e.user=void 0,a.logout()},e.createUser=function(t,r,n,o){if(n===o){var i={username:t,email:r,password:n};t&&r&&n&&a.createUser(i).then(function(t){e.login(r,n)},function(t){e.err="Username or email address already in use",e.username="",e.password="",e.email="",e.username="",$(".err").show()})}else $("#createPassword").val(""),$("#pwdiv").addClass("has-error"),$("#createPasswordCheck").val(""),$("#pwcdiv").addClass("has-error"),e.err="Passwords do not match",$(".err").show()},a.getUser().then(function(t){t.data.username&&(console.log(t.data),t.data.gameNames=t.data.games.map(function(e){return e.name}),e.user=t.data)},function(e){e||console.log("no err")})}]),app.controller("profileCtrl",["$scope","profileSrvc","$location","$state",function(e,t,a,r){$('[data-toggle="popover"]').popover(),e.games=t.games,e.getProfile=function(){var r=a.url().replace("/user/","");t.getProfile(r).then(function(a){e.profile=a.data,e.profile.messages.map(function(e){return e.readableDate=moment(e.date).format("MMM Do YYYY, hh:mm:ss a")}),e.profile.messages.map(function(e){return e.readableDate=moment(e.date).format("MMM Do YYYY, hh:mm:ss a")}),e.profile.messages.sort(function(e,t){return e.date<t.date}),e.profile.games=JSON.parse(e.profile.games),e.profile.likesId=e.profile.likes.map(function(e){return e.poster_id}),e.profile.dislikesId=e.profile.dislikes.map(function(e){return e.poster_id}),e.profile.teamNames=e.profile.teams.map(function(e){return e.team_name}),t.chart(e.profile),console.log(e.profile)},function(e){return console.log(e)})},e.checkAnswers=function(a,r,n,o){var i={id:a,a1:r,a2:n,a3:o};t.checkAnswers(i).then(function(t){e.id=e.recover,e.recover=void 0,t.data[0].user_id&&(e.pwchanger=!0)})},e.submitNewPassword=function(r,n){r===n?(t.submitNewPassword(r,e.id[0].id),a.path("login_signup")):e.err="Passwords don't match"},"/edit_profile"!==a.url()||e.user||a.path("login_signup"),e.editProfile=function(r,n){var o=[],i=void 0;$("input[type=checkbox]:checked").each(function(e,t){o.push($(t).attr("id"))}),o=o.map(function(t){for(var a=0;a<e.games.length;a++)if(e.games[a].name===t)return t=e.games[a]}),console.log(n),i=document.getElementById("preview").src.includes("leag")?document.getElementById("preview").src:n||e.user.image_url;var s={image:i||e.user.image_url,description:r||e.user.description,games:o.length?o:e.user.games};t.editProfile(s),a.path("/user/"+e.user.username),location.reload()},e.upload=function(e){t.upload(e)};var n=a.url().replace("/user/","");$(window).scrollTop(0),e.getProfile(n),e.addLike=function(a,r){var n={user_id:a,poster_id:r,date:Date.now()};e.profile.dislikesId.includes(r)&&t.removeDislike(n),t.addLike(n).then(function(t){e.getProfile()},function(e){return console.log(e)})},e.addDislike=function(a,r){var n={user_id:a,poster_id:r,date:Date.now()};e.profile.likesId.includes(r)&&t.removeLike(n),t.addDislike(n).then(function(t){e.getProfile()},function(e){return console.log(e)})},e.createUserMessage=function(a){var r={message:a,user_id:e.profile.id,poster_id:e.user.id,poster_username:e.user.username,date:Date.now(),poster_image:e.user.image_url};t.createUserMessage(r).then(function(t){e.getProfile(),e.comment=""})},e.teamInvite=function(a,r,n){if(console.log(e.user.id,e.profile.id,a,r),r!==e.user.id&&n>1)return void alert("You don't have nessessary premissions to do that");var o={invited:e.profile.id,inviter:e.user.id,team:a};t.teamInvite(o)},e.acceptTeamInvite=function(a,r){var n={invited:a,team:r};t.acceptTeamInvite(n),e.getProfile()},e.declineTeamInvite=function(a,r){var n={invited:a,team:r};t.decilineTeamInvite(n),e.getProfile()},e.addPasswordRecovery=function(r,n,o,i,s,l){var u={q1:r,a1:n,q2:o,a2:i,q3:s,a3:l,user:e.user.id};t.addPasswordRecovery(u).then(function(t){a.path("/user/"+e.user.username),location.reload()})},e.getPwRecovery=function(a){t.getPwRecovery(a).then(function(t){e.recover=t.data,console.log(t.data)})}}]),app.controller("teamCtrl",["$scope","$state","$stateParams","teamSrvc","profileSrvc","$location",function(e,t,a,r,n,o){if("createTeam"!==t.current.name||e.user||o.path("login_signup"),"edit_team"!==t.current.name||e.user||o.path("login_signup"),e.games=n.games,$(function(){$('[data-toggle="tooltip"]').tooltip()}),e.options=[{label:"only I can invite",value:2},{label:"anybody can invite",value:1},{label:"anybody can join",value:0}],e.priv=e.options[2],"team"===t.current.name){var i=function(){r.getTeam().then(function(t){t.data.messages.sort(function(e,t){return e.date<t.date}),t.data.messages=t.data.messages.map(function(e){return e.date=moment(e.date).format("MMM Do YYYY, h:mm:ss a"),e}),e.team=t.data,e.team.likesId=e.team.likes.map(function(e){return e.id}),e.team.dislikesId=e.team.dislikes.map(function(e){return e.user_id}),e.team.team_games&&(e.team.games=JSON.parse(e.team.team_games)),r.teamChart(e.team),console.log(e.team)},function(e){console.log(e)})};i()}e.upload=function(e){n.upload(e)},e.createTeam=function(t,a,n,i){var s=[],l=void 0;$("input[type=checkbox]:checked").each(function(e,t){s.push($(t).attr("id"))}),s=s.map(function(t){for(var a=0;a<e.games.length;a++)if(e.games[a].name===t)return t=e.games[a]}),s=JSON.stringify(s),l=document.getElementById("preview").src.includes("leag")?document.getElementById("preview").src:n||null;var u={team_name:t,team_description:a,team_photo:l,privacy:i.value,team_games:s};r.createTeam(u),o.path("/user/"+e.user.username),location.reload()},e.joinTeam=function(){r.joinTeam(e.user.id,e.team.team_id),location.reload()},e.leaveTeam=function(){r.leaveTeam(e.user.id,e.team.team_id),location.reload()},e.kickFromTeam=function(e,t){var a={user_id:e,team_id:t};console.log(a),r.kickFromTeam(a),i()},e.createTeamsMessage=function(t){r.createTeamMessage(e.user,e.team,t).then(function(t){r.getTeam().then(function(t){t.data.messages.sort(function(e,t){return e.date<t.date}),t.data.messages=t.data.messages.map(function(e){return e.date=moment(e.date).format("MMM Do YYYY, h:mm:ss a"),e}),e.team=t.data,r.teamChart(e.team)},function(e){console.log(e)})})},e.addLike=function(){var t={user_id:e.user.id,team_id:e.team.team_id,date:Date.now()};e.team.dislikes.map(function(a){a.user_id===e.user.id&&r.removeDislike(t)}),r.addLike(t).then(function(e){return i()})},e.addDislike=function(){var t={user_id:e.user.id,team_id:e.team.team_id,date:Date.now()};e.team.likes.map(function(a){a.user_id===e.user.id&&r.removeLike(t)}),r.addDislike(t).then(function(e){return i()})},e.edit_team=function(t,n,i,s){if(e.user.id===a.admin)return alert("you do not have permission to edit this team. you will now be redirected back home"),void o.path("profile({username:$scope.user.username})");var l=[],u=void 0;u=document.getElementById("preview").src.includes("leag")?document.getElementById("preview").src:n||null,$("input[type=checkbox]:checked").each(function(e,t){l.push($(t).attr("id"))}),l=l.map(function(t){for(var a=0;a<e.games.length;a++)if(e.games[a].name===t)return t=e.games[a]}),l=JSON.stringify(l),u=document.getElementById("preview").src.includes("leag")?document.getElementById("preview").src:n||null;var m={user_id:e.user.id,team_id:a.team,team_description:t||null,team_photo:u,privacy:i.value,team_games:l};r.edit_team(m),o.path("team/"+a.team)}}]),app.service("mainSrvc",["$http",function(e){this.login=function(t){return e.post("/login",t)},this.createUser=function(t){return e.post("/user/create",t)},this.getUser=function(){return e.get("/user/currentUser")},this.logout=function(){e.get("/user/logout")}}]),app.service("profileSrvc",["$http",function(e){function t(e){var t=new XMLHttpRequest;t.open("GET","/s3_signed_url?file_name="+e.name+"&file_type="+e.type),t.onreadystatechange=function(){if(4===t.readyState)if(200===t.status){var r=JSON.parse(t.responseText);a(e,r.signed_request,r.url)}else alert("Could not get signed URL.")},t.send()}function a(e,t,a){var r=new XMLHttpRequest;r.open("PUT",t),r.setRequestHeader("x-amz-acl","public-read"),r.onload=function(){200===r.status&&(document.getElementById("preview").src=a,console.log("file uploaded to:",a),this.url=a)},r.onerror=function(){alert("Could not upload file.")},r.send(e)}this.addPasswordRecovery=function(t){return e.post("/user/addPasswordRecovery",t)},this.getPwRecovery=function(t){return e.post("/user/getPwRecovery",{email:t})},this.checkAnswers=function(t){return e.post("/user/checkAnswers",t)},this.submitNewPassword=function(t,a){return e.post("/user/submitNewPassword",{pass:t,id:a})},this.teamInvite=function(t){e.post("team/teamInvite",t)},this.acceptTeamInvite=function(t){e.post("team/acceptTeamInvite",t)},this.decilineTeamInvite=function(t){e.post("team/declineTeamInvite",t)},this.addLike=function(t){return e.post("/user/addLike",t)},this.addDislike=function(t){return e.post("/user/addDislike",t)},this.removeLike=function(t){e.post("/user/removeLike",t)},this.removeDislike=function(t){e.post("/user/removeDislike",t)},this.editProfile=function(t){e.patch("/user/edit_profile",t)},this.getProfile=function(t){return e.get("/user/getProfile/"+t)},this.createUserMessage=function(t){return e.post("/user/userMessages",t)},this.upload=function(e){var a=document.getElementById(e).files,r=a[0];if(null===r)return void alert("No file selected.");t(r)},this.games=[{name:"DOTA2",image:"/assets/dota2.png"},{name:"LoL",image:"/assets/lollogo.png"},{name:"CSGO",image:"/assets/cslogo.png"},{name:"WoW",image:"/assets/wowlogo.png"},{name:"Halo",image:"/assets/halo.png"},{name:"Overwatch",image:"/assets/overwatchlogo.png"}],this.chart=function(e){var t={};e.likes.forEach(function(e){t[moment(e.date).format("YYYYMMDD")]=(t[moment(e.date).format("YYYYMMDD")]||0)+1});var a=[];for(var r in t)a.push({x:r,y:t[r]});var n={};e.dislikes.forEach(function(e){n[moment(e.date).format("YYYYMMDD")]=(n[moment(e.date).format("YYYYMMDD")]||0)+1});var o=[];for(var i in n)o.push({x:i,y:n[i]});console.log(a);var s=$("#myChart");new Chart(s,{type:"line",data:{label:"days",datasets:[{label:"likes",backgroundColor:"rgba(75,192,192,0.3)",borderColor:"rgba(75,192,192,.5)",data:a,tension:.2},{label:"dislikes",data:o,backgroundColor:"rgba(192,100,100,0.3)",borderColor:"rgba(192,100,100,.5)"}]},options:{scales:{yAxes:[{type:"linear",display:!0,position:"left",ticks:{stepSize:2,beginAtZero:!0},gridLines:{display:!0}}],xAxes:[{type:"time",position:"bottom",time:{unit:"day",round:"day"},gridLines:{display:!0},stacked:!0}]}}})}}]),app.service("teamSrvc",["$http","$state",function(e,t){this.createTeam=function(t){e.post("/team/createTeam",t)},this.getTeam=function(){return e.get("/team/getTeam/"+t.params.id)},this.joinTeam=function(t,a){var r={user_id:t,team_id:a};return e.post("/team/joinTeam",r)},this.leaveTeam=function(t,a){var r={user_id:t,team_id:a};return e.post("/team/leaveTeam",r)},this.kickFromTeam=function(t){e.post("team/kickFromTeam",t)},this.edit_team=function(t){return e.patch("/team/edit_team",t)},this.createTeamMessage=function(t,a,r){var n={team_id:a.team_id,poster_id:t.id,poster_username:t.username,message:r};return e.post("/team/createTeamsMessage",n)},this.addLike=function(t){return e.post("/team/addLike",t)},this.addDislike=function(t){return e.post("/team/addDislike",t)},this.removeLike=function(t){return e.post("/team/removeLike",t)},this.removeDislike=function(t){return e.post("/team/removeDislike",t)},this.teamChart=function(e){function t(t){var a=e[t].map(function(e){return moment(e.date).format("YYYYMMDD")}),r={};a.forEach(function(e){return r[e]=(r[e]||0)+1}),a=[];for(var n in r)a.push({x:n,y:r[n]});return a}var a=t("likes"),r=t("dislikes"),n=$("#teamChart");new Chart(n,{type:"line",data:{datasets:[{label:"likes",borderColor:"rgba(75,192,192,.5)",backgroundColor:"rgba(75,192,192,0.3)",data:a,tension:.5},{label:"dislikes",data:r,borderColor:"rgba(192,100,100,0.3)",backgroundColor:"rgba(192,100,100,.5)"}]},options:{scales:{yAxes:[{type:"linear",ticks:{stepSize:2,beginAtZero:!0},stacked:!1}],xAxes:[{type:"time",time:{unit:"day",round:"day"}}]}}})}}]),app.component("navComp",{templateUrl:"js/components/navComponent/navComponent.html",bindings:{user:"=",logout:"&"},controller:"navCtrl"}),app.controller("navCtrl",["$scope","navSrvc","$location","$state","$stateParams",function(e,t,a,r,n){e.results=null,e.goTo=function(t){a.path("/search/"+t),e.query=""},console.log(n),t.search(n.query).then(function(t){t.data.teams.map(function(e){return e.team_games=JSON.parse(e.team_games)}),e.results=t.data,console.log(e.results)},function(e){return console.log(e)}),e.test="hello world"}]),app.service("navSrvc",["$http",function(e){this.search=function(t){return e.get("/search/"+t)}}]);