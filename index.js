var express = require('express')
var proxy = require('express-http-proxy');
var app = express()
var fs = require('fs');

const IP_REGEXP = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
let scooterIP = "192.168.1.125";
let scooterPort = "11088";

let settings = {};

app.use(express.json());

app.post('/ip/:newIP', function (req, res) {
    if (IP_REGEXP.test(req.params.newIP)) {
        scooterIP = req.params.newIP;
        console.log("Changing scooter IP to " + scooterIP);
    }
    res.send(scooterIP);
})

app.get('/api/ip/', function (req, res) {
    res.send({ ip: scooterIP });
})

app.put('/api/settings/:id', function (req, res) {
    var id = req.params.id;
    settings[id] = req.body;
    settings[id].id = id;
    fs.writeFile('settings.json', JSON.stringify(settings,null, 4), function(err) {
        res.status(err ? 500 : 200).send();
    });
});

app.delete('/api/settings/:id', function (req, res) {
    var id = req.params.id;
    delete settings[id];
    fs.writeFile('settings.json', JSON.stringify(settings,null, 4), function(err) {
        res.status(err ? 500 : 200).send();
    });
});

app.get('/api/settings', function (req, res) {
    let arr = [];
    Object.keys(settings).forEach(res => arr.push(settings[res]));
    res.send(arr);
});

/*
app.use('/config', function (req, res) {
    res.send([{ "id": 0, "name": "Dual-Color-Blink", "params": [{ "name": "hue1", "defaultValue": 204, "minValue": 0, "maxValue": 359 }, { "name": "sat1", "defaultValue": 99, "minValue": 0, "maxValue": 99 }, { "name": "bright1", "defaultValue": 5, "minValue": 0, "maxValue": 99 }, { "name": "delay1", "defaultValue": 350, "minValue": 0, "maxValue": 1000 }, { "name": "hue2", "defaultValue": 204, "minValue": 0, "maxValue": 359 }, { "name": "sat2", "defaultValue": 10, "minValue": 0, "maxValue": 99 }, { "name": "bright2", "defaultValue": 5, "minValue": 0, "maxValue": 99 }, { "name": "delay2", "defaultValue": 150, "minValue": 0, "maxValue": 1000 }] }, { "id": 1, "name": "Ring Up Down Rainbow With Shadow", "params": [{ "name": "sat1", "defaultValue": 99, "minValue": 0, "maxValue": 99 }, { "name": "bright", "defaultValue": 30, "minValue": 0, "maxValue": 99 }, { "name": "delayMS", "defaultValue": 10, "minValue": 0, "maxValue": 500 }, { "name": "changeColorEverySteps", "defaultValue": 30, "minValue": 0, "maxValue": 100 }, { "name": "colorChangeSteps", "defaultValue": 30, "minValue": 0, "maxValue": 100 }, { "name": "colorChangeOnDirectionChange", "defaultValue": 1, "minValue": 0, "maxValue": 1 }] }, { "id": 2, "name": "Single running point", "params": [{ "name": "red", "defaultValue": 60, "minValue": 0, "maxValue": 255 }, { "name": "green", "defaultValue": 0, "minValue": 0, "maxValue": 255 }, { "name": "blue", "defaultValue": 5, "minValue": 0, "maxValue": 255 }, { "name": "delayMS", "defaultValue": 50, "minValue": 0, "maxValue": 500 }] }, { "id": 3, "name": "Running ring", "params": [{ "name": "red", "defaultValue": 60, "minValue": 0, "maxValue": 255 }, { "name": "green", "defaultValue": 0, "minValue": 0, "maxValue": 255 }, { "name": "blue", "defaultValue": 5, "minValue": 0, "maxValue": 255 }, { "name": "delayMS", "defaultValue": 50, "minValue": 0, "maxValue": 500 }] }, { "id": 4, "name": "Running ring with shadow", "params": [{ "name": "hue", "defaultValue": 20, "minValue": 0, "maxValue": 359 }, { "name": "sat", "defaultValue": 99, "minValue": 0, "maxValue": 99 }, { "name": "bright", "defaultValue": 50, "minValue": 0, "maxValue": 99 }, { "name": "delayMS", "defaultValue": 5, "minValue": 0, "maxValue": 200 }] }, { "id": 5, "name": "Running ring up and down with shadow", "params": [{ "name": "hue", "defaultValue": 204, "minValue": 0, "maxValue": 359 }, { "name": "sat", "defaultValue": 99, "minValue": 0, "maxValue": 99 }, { "name": "bright", "defaultValue": 30, "minValue": 0, "maxValue": 99 }, { "name": "delayMS", "defaultValue": 5, "minValue": 0, "maxValue": 200 }] }, { "id": 6, "name": "Full screen rainbow", "params": [{ "name": "sat", "defaultValue": 99, "minValue": 0, "maxValue": 99 }, { "name": "bright", "defaultValue": 5, "minValue": 0, "maxValue": 99 }, { "name": "delayMS", "defaultValue": 20, "minValue": 0, "maxValue": 500 }, { "name": "delayDisco", "defaultValue": 0, "minValue": 0, "maxValue": 500 }] }, { "id": 7, "name": "Random dots", "params": [{ "name": "delayMS", "defaultValue": 50, "minValue": 0, "maxValue": 500 }, { "name": "bright", "defaultValue": 10, "minValue": 0, "maxValue": 99 }, { "name": "sat", "defaultValue": 99, "minValue": 0, "maxValue": 99 }] }, { "id": 8, "name": "Random dots with gradient", "params": [{ "name": "delayMS", "defaultValue": 25, "minValue": 0, "maxValue": 500 }, { "name": "bright", "defaultValue": 7, "minValue": 0, "maxValue": 99 }, { "name": "sat", "defaultValue": 99, "minValue": 0, "maxValue": 99 }, { "name": "steps", "defaultValue": 25, "minValue": 1, "maxValue": 100 }] }, { "id": 9, "name": "Random dots with full gradient", "params": [{ "name": "delayMS", "defaultValue": 25, "minValue": 0, "maxValue": 500 }, { "name": "maxBright", "defaultValue": 7, "minValue": 0, "maxValue": 99 }, { "name": "steps", "defaultValue": 25, "minValue": 1, "maxValue": 100 }] }, { "id": 10, "name": "Analyzer", "params": [{ "name": "delayMS", "defaultValue": 80, "minValue": 0, "maxValue": 500 }, { "name": "bright", "defaultValue": 5, "minValue": 0, "maxValue": 50 }, { "name": "hue", "defaultValue": 0, "minValue": 0, "maxValue": 359 }, { "name": "hueTop", "defaultValue": 129, "minValue": 0, "maxValue": 359 }, { "name": "sat", "defaultValue": 99, "minValue": 0, "maxValue": 99 }] }]);
});*/

function selectProxyHost() {
    return "http://" + scooterIP + ":" + scooterPort;
}
app.use('/scooter/', proxy(selectProxyHost));

if (process.env.PROD == 1) {
    app.use(express.static('dist'));
} else {
    app.use('/', proxy('http://localhost:4200'));
}

app.listen(3000);

//Load settings on startup
fs.exists('settings.json', function (exists) {
    if (exists) {
        console.log("settings.json file exists");
        fs.readFile('settings.json', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                settings = JSON.parse(data);
                console.log("Settings loaded.");
            }
        });
    } else {
        settings = {};
    }
});