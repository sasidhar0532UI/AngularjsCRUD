"use strict"
var app = angular.module("ContactsApp", ['ui.router', 'getDetailsCtrlModule', 'addContactsCtrlModule', 'servicesModule']);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: "home.html"
        })
        .state('customer', {
            url: '/customer',
            templateUrl: 'customer.html'

        })

        .state('customer.customerList', {
            url: '/customerList',
            templateUrl: 'customerList.html',
            controller: 'getDetailsCtrl'

        })
        .state('customer.updateContact', {
            url: '/updateContact',
            templateUrl: 'updateContact.html',
            controller: 'getDetailsCtrl'
        })
        .state('customer.addContact', {
            url: '/addcontact',
            templateUrl: 'addcontact.html',
            controller: 'addContactsCtrl'

        })

});
