console.log("server starts in a bit..");

var express = require('express');
var fs = require('fs');
var bodyParser = require("body-parser");


console.log("express starting..");
var app = express();
app.use(bodyParser.json());

app.use('/', express.static('public'));

app.get('/contactsList', function(request, response) {

    response.sendFile(__dirname + "/data/contactList.json");

});

app.post('/addContact', function(request, response) {
    console.log("incoming data=" + JSON.stringify(request.body));

    fs.readFile(__dirname + "/data/contactList.json", 'utf-8', function(err, data) {


        console.log('file data' + data);
        var fileJsonData = JSON.parse(data);

        var newContact = request.body;

        var max = 0;
        for (var i = 0; i < fileJsonData.contactList.length; i++) {
            if (fileJsonData.contactList[i].id > max) {
                max = fileJsonData.contactList[i].id;
            }
        }
        console.log(max);
        newContact.id = max + 1;

        console.log("newContact=" + JSON.stringify(newContact));

        fileJsonData.contactList.push(newContact);

        var stringFile = JSON.stringify(fileJsonData);

        fs.writeFile(__dirname + "/data/contactList.json", stringFile);
        //fs.close();

        //  response.send(stringFile);
        response.send("success");

    });



});

app.post('/deleteContact', function(request, response) {

    console.log("incoming data=" + JSON.stringify(request.body));

    fs.readFile(__dirname + "/data/contactList.json", 'utf-8', function(err, data) {


        console.log('file data' + data);
        var fileJsonData = JSON.parse(data);

        var deletedContact = request.body;
        var index = -1;
        for (var i = 0; i < fileJsonData.contactList.length; i++) {
            if (fileJsonData.contactList[i].id == deletedContact.id) {
                index = i;
            }
        }
        console.log("index=" + index);
        if (index >= 0) {
            var newContactsList = fileJsonData.contactList.splice(index, 1);
            var stringFile = JSON.stringify(fileJsonData);
            console.log("after Delete=" + stringFile);
            fs.writeFile(__dirname + "/data/contactList.json", stringFile);
            // response.send(stringFile);
            response.send("success");

        } else {
            //response.send(JSON.stringify(fileJsonData));
            response.send("success");
        }

    });

});

app.get('/getContact', function(request, response) {

    var id = request.query.id;
    console.log("id=" + id);

    fs.readFile(__dirname + "/data/contactList.json", 'utf-8', function(err, data) {


        console.log('file data' + data);
        var fileJsonData = JSON.parse(data);
        var foundContact = {};


        for (var i = 0; i < fileJsonData.contactList.length; i++) {
            if (fileJsonData.contactList[i].id == id) {
                foundContact = fileJsonData.contactList[i];
            }
        }


        var stringFile = JSON.stringify(foundContact);
        response.send(stringFile);

        //response.send("success");
    });

    //return "success";

});

app.get('/searchContact', function(request, response) {
    var fName = request.query.firstName;
    console.log("id=" + fName);

    fs.readFile(__dirname + "/data/contactList.json", 'utf-8', function(err, data) {

        console.log('file data' + data);
        var fileJsonData = JSON.parse(data);
        var foundContact = {};

        foundContact.contactList = [];

        for (var i = 0; i < fileJsonData.contactList.length; i++) {

            if (fileJsonData.contactList[i].firstName == fName) {
                console.log("obj=" + fileJsonData.contactList[i]);
                (foundContact.contactList).push(fileJsonData.contactList[i]);



            }
        }
        console.log(foundContact);

        var stringFile = JSON.stringify(foundContact);
        response.send(stringFile);
    });

});

app.post('/updateContact', function(request, response) {

    console.log("incoming data=" + JSON.stringify(request.body));

    fs.readFile(__dirname + "/data/contactList.json", 'utf-8', function(err, data) {


        console.log('file data' + data);
        var fileJsonData = JSON.parse(data);

        var updatedContact = request.body;

        for (var i = 0; i < fileJsonData.contactList.length; i++) {
            if (fileJsonData.contactList[i].id == updatedContact.id) {
                fileJsonData.contactList[i] = updatedContact;
                break;
            }
        }
        var stringFile = JSON.stringify(fileJsonData);

        fs.writeFile(__dirname + "/data/contactList.json", stringFile);
        //fs.close();

        //response.send(stringFile);
        response.send("success");

    });

});



var server = app.listen(3000, function() {
    console.log("server started at port 3000");
});