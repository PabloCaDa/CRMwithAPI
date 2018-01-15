(function () {
        'use strict';
        angular
            .module('Agenda')
            .factory('ContactsLocalProvider', ContactsLocalProvider);

        ContactsLocalProvider.$inject = [];

        /* @ngInject */
        function ContactsLocalProvider() {
            var exports = {
                getContacts: getContacts,
                getContact: getContact,
                saveContact: saveContact,
                saveNewContact: saveNewContact,
                updateContact: updateContact,
                deleteContact: deleteContact,
                saveForm:saveForm
            };


            return exports;

            ////////////////


            function getContacts() {
                if ('contactStorage' in localStorage) {
                    console.log(JSON.parse(localStorage.getItem('contactStorage')));
                    return JSON.parse(localStorage.getItem('contactStorage'))
                } else {
                    return [];
                }
            }

            function getContact(id) {
                if ('contactStorage' in localStorage)
                    var contacts = JSON.parse(localStorage.getItem('contactStorage'));
                for (var i = 0; i < contacts.length; i++) {
                    if (contacts[i].id === id) {
                        return contacts[i];
                    }
                }
            }

            function saveContact(contact){
                localStorage.setItem('contactStorage',JSON.stringify(contact));
            }

            function randomId() {
                return Math.random().toString(36).substr(2, 10);
            }

            function saveNewContact(contact) {
                var before = getContacts();
                var id = randomId();
                contact.id = id;
                before.push(contact);
                localStorage.setItem('contactStorage', JSON.stringify(before))
                return id;
            }

            function saveForm(form){
                localStorage.setItem('formStorage', JSON.stringify(form))

            }

            function getForm(){
                if ('formStorage' in localStorage) {
                    return JSON.parse(localStorage.getItem('formStorage'))
                } else {
                    return {};
            }
            }

            function updateContact(newData) {
                var before = getContacts();
                for (var i = 0; i < before.length; i++) {
                    if (before[i].id === newData.id) {
                        before[i] = newData;
                        saveContact(before);

                    }

                }
            }

            function deleteContact(id) {
                var before = getContacts();
                for (var i = 0; i < before.length; i++) {
                    if (before[i].id === id) {
                        var deleteConfirm = confirm("Are you sure, mate :_(  ?");
                        if (deleteConfirm) {
                            before.splice(i, 1);
                            saveContact(before)

                        }
                    }
                }
            }

        }

        })();
