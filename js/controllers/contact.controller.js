(function() {
    'use strict';

    angular
        .module('Agenda')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$scope', '$routeParams', 'ContactsLocalProvider'];

    /* @ngInject */
    function ContactController($scope, $routeParams, ContactsLocalProvider){
        var vm = this;
        vm.property = 'ContactController';


        $scope.contact={};

        activate();

        ////////////////

        function activate() {
            var contactId = $routeParams.id;
            $scope.contact = ContactsLocalProvider.getContact(contactId);
        }
    }
})();
