"use strict"
var app = angular.module('getDetailsCtrlModule', ['ui.router']);
app.controller('getDetailsCtrl', function($scope, $http, $state, services) {


    $scope.customerDetails = {};

    $scope.editContact = function(id) {
        console.log(id);
        var getObj = services.getContactListId(id);
        getObj.then(function(response) {
            console.log(response.data);
            services.editContacts = response.data;
            console.log(services.editContacts);
            $state.go("customer.updateContact");

        })

    }
    $scope.editContacts = services.editContacts;
    var enteredDetails = {};
    $scope.editCutomerDetails = function() {
        var pushObj = services.updateContact($scope.editContacts);
        console.log($scope.editContacts);

        $state.go("customer.customerList");
    }
    $scope.delContact = {};
    $scope.deleteContact = function(id) {
        $scope.delContact.id = id;
        var deleteObj = services.deleteContact($scope.delContact);
        deleteObj.then(function(response) {

            if (response.data == "success") {
                console.log("At 55");
                $scope.customerDetails = {};
                getData();
            }

        })

    }

    function getData() {
        var objLists = services.getContactList();
        objLists.then(function(response) {
            console.log(response);
            $scope.customerDetails = response.data.contactList;
        })
    }
    getData();

});