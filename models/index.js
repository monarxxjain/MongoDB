const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const models = {};

// Read all files in the models directory
fs.readdirSync(__dirname)
    .filter((file) => file !== 'index.js') // Exclude the index.js file
    .forEach((file) => {
        const model = require(path.join(__dirname, file));
        models[model.modelName] = model;
    });

module.exports = models;
