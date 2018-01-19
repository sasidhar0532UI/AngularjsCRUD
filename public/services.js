var app = angular.module('servicesModule', ['ui.router']);
app.service('services', function ($http) {

    this.postContacts = function (enteredDetails) {
        var postObj = $http.post("http://localhost:3000/addContact", enteredDetails);
        return postObj;
    }

    this.getContactList = function () {
        var objList = $http.get('http://localhost:3000/contactsList');
        return objList;
    }

    this.getContactListId = function (id) {
        var getObj = $http.get("http://localhost:3000/getContact?id=" + id);
        return getObj;

    }
    this.editContacts = {};

    this.updateContact = function (data) {
        console.log("data:" + data);
        var getObj = $http.post("http://localhost:3000/updateContact", data);
        return getObj;

    }

    this.deleteContact = function (data) {
        console.log(data);
        var delObj = $http.post("http://localhost:3000/deleteContact", data);
        return delObj;
    }
});
