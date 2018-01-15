(function () {
    'use strict';

    angular
        .module('Agenda', ["ngRoute"]).config(config);
    config.$inject = ['$routeProvider'];

    function config($routeProvider){
        $routeProvider
        .when("/",{
            controller:'HomeController',
            templateUrl:'views/home_agenda.html'
        })

        .when("/contact/:id",{
            controller:'ContactController',
            templateUrl:'views/contact_agenda.html'
        })
    }
})();

