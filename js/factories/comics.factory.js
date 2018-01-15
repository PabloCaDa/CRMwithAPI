(function () {
    'use strict';
    angular
        .module('Agenda')
        .factory('ComicsProvider', ComicsProvider);

    ComicsProvider.$inject = ['$http'];

    /* @ngInject */
    function ComicsProvider($http){
        var exports = {
            getComics : getComics

        };


        return exports;

        ////////////////

        function getComics(q,jumper) {
            return $http.get("https://gateway.marvel.com:443/v1/public/comics?titleStartsWith="+q+"&limit=3&offset="+jumper+"&apikey=25d696b5c1f85a611e282177c5e21a55")
            .then (function (response){
                console.log(response.data.data.results);
                return response.data.data.results;
            }, function (error){console.log("Hubo algun error");
        });
        }

    }
})();
