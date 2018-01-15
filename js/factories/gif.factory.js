(function () {
    'use strict';
    angular
        .module('Agenda')
        .factory('GifsProvider', GifsProvider);

    GifsProvider.$inject = ['$http'];

    /* @ngInject */
    function GifsProvider($http){
        var exports = {
            getGifs : getGifs
        };


        return exports;

        ////////////////

        function getGifs(q,jumper) {
            return $http.get("https://api.giphy.com/v1/gifs/search?api_key=a0IaMQiM1i6iFNs3BtF7MSxnmuScACda&q="+q+"&limit=8&offset="+jumper).then(loadGifs,errorMessage)
        }

        function loadGifs (response){

//            for(var i = 0; i <response.data.data.length; i++){
//                response.data.data[i].isFav=false;
//            }
            console.log(response.data.data);
            console.log("Conection Succesfully Done");
            return response.data;

        }

        function errorMessage(){
            console.log("Conection Failure");
        }


    }

})();
