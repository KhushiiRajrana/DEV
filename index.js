const express = require('express');
const app = express();

app.use(express.json()); // VERY IMPORTANT

var users = [{
    name: 'Khushi',
    kidneys: [{ healthy: true }, { healthy: true }]
}];

app.get('/', function (req, res) {
    const total = users[0].kidneys.length;

    let healthy = 0;
    for (let i = 0; i < total; i++) {
        if (users[0].kidneys[i].healthy) {
            healthy++;
        }
    }

    const unhealthy = total - healthy;

    res.json({
        total_kidneys: total,
        healthy_kidneys: healthy,
        unhealthy_kidneys: unhealthy
    });
});

app.post('/', function (req, res) {
    const isHealthy = req.body.isHealthy;

    users[0].kidneys.push({
        healthy: isHealthy
    });

    res.json({
        msg: 'Kidney added successfully'
    });
});

app.put('/', function (req, res) {

    if (!isThereAnyUnhealthyKidney()) {
        return res.status(400).json({
            msg: 'There is no unhealthy kidney to fix'
        });
    }

    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }

    res.json({
        msg: 'All kidneys are healthy now'
    });
});

app.delete('/', function (req, res) {

    if (!isThereAnyUnhealthyKidney()) {
        return res.status(400).json({
            msg: 'There is no unhealthy kidney to delete'
        });
    }

    const healthyKidneys = [];

    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (users[0].kidneys[i].healthy) {
            healthyKidneys.push(users[0].kidneys[i]);
        }
    }

    users[0].kidneys = healthyKidneys;

    res.json({
        msg: 'All unhealthy kidneys are deleted'
    });
});

function isThereAnyUnhealthyKidney() {
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            return true;
        }
    }
    return false;
}

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
