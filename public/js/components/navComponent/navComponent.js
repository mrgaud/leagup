app.component('navComp',{
    templateUrl:'js/components/navComponent/navComponent.html',
    bindings:{
        user:'=',
        logout:'&'
    },
    controller:'navCtrl'
})
