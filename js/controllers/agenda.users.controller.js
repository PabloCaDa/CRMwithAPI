(function () {
    'use strict';

    angular
        .module('Agenda')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope','$routeParams', 'ContactsLocalProvider', 'GifsProvider','ComicsProvider'];

    /* @ngInject */
    function HomeController($scope, $routeParams, ContactsLocalProvider, GifsProvider,ComicsProvider) {
        var vm = this;
        vm.property = 'HomeController';

        $scope.contacts = [];
        $scope.contact = {};
        $scope.newContact = { gifFavs : [], comicFavs : []  };
        $scope.modified = false;
        $scope.data = true;
        $scope.boolGifs = false;
        $scope.boolComics = false;
        $scope.comics = [];
        $scope.comic = {};
        $scope.gifs = [];
        $scope.gif = {};
        $scope.gifSearched = "";
        $scope.gifFav = {};
        $scope.gifFavs = [];
        $scope.comicFav = {};
        $scope.comicFavs = [];
        $scope.comicSearched = "";
        $scope.property = "";
        $scope.searchParams={};
        $scope.jumperG = 0;
        $scope.jumperC = 0;

        $scope.addContact = addContact;
        $scope.cancel = cancel;
        $scope.removeContact = removeContact;
        $scope.copyContact = copyContact;
        $scope.modifyContact = modifyContact;
        $scope.keyUpForm = keyUpForm;
        $scope.isData = isData;
        $scope.isComics = isComics;
        $scope.isGifs = isGifs;
        $scope.searchGifs = searchGifs;
        $scope.isFavGif = isFavGif;
        $scope.sortBy = sortBy;
        $scope.next8 = next8;
        $scope.next3 = next3;
        $scope.searchComics = searchComics;
        $scope.isFavComic = isFavComic;
        $scope.previous3 = previous3,
        $scope.previous8 = previous8;
        $scope.checkFull = checkFull;


        activate();

        ////////////////

        function activate() {
            $scope.contacts = ContactsLocalProvider.getContacts();

        }

        function display() {
            $scope.contacts = ContactsLocalProvider.getContacts();

        }

        function keyUpForm() {
            ContactsLocalProvider.saveForm($scope.newContact);
        }

        function checkFull() {
            if ($scope.newContact.name && $scope.newContact.mail && $scope.newContact.photo && $scope.newContact.phone && $scope.newContact.gifFavs.length !=0 && $scope.newContact.comicFavs.length !=0) {
                return true;
            } else {
                return false;
            }
        }


        function cancel() {
            $scope.modified=false;
            $scope.newContact = {};
            $scope.gifSearched = "";
            $scope.comicSearched="";
            $scope.comics=[];
            $scope.gifs=[];

        }

        function error(){
            console.log("!!BIMBA!!");
        }

        function addContact() {
            ContactsLocalProvider.saveNewContact($scope.newContact);
            display();
            $scope.newContact = {};
        }

        function copyContact(id) {
            for (var i = 0; i < $scope.contacts.length; i++) {
                if ($scope.contacts[i].id === id) {
                    var copia = Object.assign({}, $scope.contacts[i]);
                    $scope.newContact = copia;
                    $scope.gifFavs= copia.gif;
                    ContactsLocalProvider.saveForm($scope.newContact);
                    document.getElementById("form").style.backgroundColor = "green";
                }
            }
            $scope.modified = true;
        }

        function modifyContact() {
            ContactsLocalProvider.updateContact( $scope.newContact );
            $scope.modified = false;
            document.getElementById("form").style.backgroundColor = "yellow";
            display();
            $scope.newContact = {};

        }


        function removeContact(id) {
            ContactsLocalProvider.deleteContact(id);
            display();

        }

        function isData() {
            $scope.data = true;
            $scope.boolGifs = false;
            $scope.boolComics = false;
            return $scope.data;
        }

        function isGifs() {
            $scope.data = false;
            $scope.boolGifs = true;
            $scope.boolComics = false;
            return $scope.boolGifs;
        }

        function isComics() {
            $scope.data = false;
            $scope.boolGifs = false;
            $scope.boolComics = true;
            return $scope.boolComics;
        }

        function gifsDisplay(gifs) {

            $scope.gifs = (gifs.data);

        }

        function searchGifs(q) {
            GifsProvider.getGifs(q,$scope.jumperG).then(gifsDisplay);
        }


        function isFavGif(gif) {
            if ($scope.newContact.gifFavs.length === 0) {
                $scope.newContact.gifFavs.push(gif);
            } else {
                for (var i = 0; i < $scope.newContact.gifFavs.length; i++) {
                    if (gif.id === $scope.newContact.gifFavs[i].id) {
                        $scope.newContact.gifFavs.splice(i, 1);
                        return;
                    }

                }
                $scope.newContact.gifFavs.push(gif);
                return;

            }
        }

        function sortBy(propertyName) {
            $scope.property = propertyName;
        }

        function next8() {
            $scope.jumperG += 8;
            GifsProvider.getGifs($scope.searchParams.gifSearched, $scope.jumperG).then(gifsDisplay,error);
        }

        function previous8() {
            $scope.jumperG -= 8;
            GifsProvider.getGifs($scope.searchParams.gifSearched, $scope.jumperG).then(gifsDisplay,error);
        }


    function searchComics(q) {
            ComicsProvider.getComics(q,$scope.jumperC).then(comicsDisplay);
        }

    function comicsDisplay(comics) {

            $scope.comics = (comics);

        }

    function isFavComic(comic) {
            if ($scope.newContact.comicFavs.length === 0) {
                $scope.newContact.comicFavs.push(comic);
            } else {
                for (var i = 0; i < $scope.newContact.comicFavs.length; i++) {
                    if (comic.id === $scope.newContact.comicFavs[i].id) {
                        $scope.newContact.comicFavs.splice(i, 1);
                        return;
                    }

                }
                $scope.newContact.comicFavs.push(comic);
                return;

            }
        }

     function next3() {
            $scope.jumperC += 3;
            ComicsProvider.getComics($scope.searchParams.comicSearched, $scope.jumperC).then(comicsDisplay,error);
        }

        function previous3() {
            $scope.jumperC -= 3;
            ComicsProvider.getComics($scope.searchParams.comicSearched, $scope.jumperC).then(comicsDisplay,error);
        }


    }


})();
