'use strict';

var Validation = function(context, fn, ids, errorMessage) {
    this.fn = fn;
    this.elements = [];
    this.errorMessage = errorMessage;
    this.context = context;
    if (typeof(ids) === 'object') {
        ids.forEach(function(id) {
            this.elements.push(document.getElementById(id));
        }.bind(this));
    } else {
        this.elements.push(document.getElementById(ids));
    };
};

Validation.prototype.validate = function() {
    return this.fn.apply(this.context, this.elements);
};

var fieldOneValidation = function(input) {
    return input.value.length > 10;
};

var fieldTwoValidation = function(input) {
    return input.value === input.value.toUpperCase();
};

var fieldThreeValidation = function(input2, input3) {
    return input2.value === input3.value.split("").reverse().join("");
};

var validatations = [
    new Validation(this, fieldOneValidation, "input1", "Input1 length smaller than 10"),
    new Validation(this, fieldTwoValidation, "input2", "Input2 must be upper case"),
    new Validation(this, fieldThreeValidation, ["input3", "input2"], "Input3 and Input2 must be reversed")
];

function onValidate() {
    validatations.forEach(function(v) {
        if (!v.validate())
            console.log(v.errorMessage);
    });
};
