/**
 * Copyright (c) 2020
 *
 * Methods for use in Evolv experiments
 *
 * @summary Methods for use in Evolv experiments
 * @author Teo Lisitza <teo.lisitza@evolv.ai>
 *
 * Created at     : 2020-12-01
 */

 function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function docComplete(fn) {
    // see if DOM is already available
    if (document.readyState === "complete") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener('readystatechange', function(event) {
            if (event.target.readyState === 'complete') {
              fn();
            }
        });
    }
}

function emitSelectorTimeout(messageObj) {
    if (messageObj && messageObj.message) {
        console.warn(messageObj.message);
    }
    window.evolv.client.emit('selector-timeout');
}

function waitForExist(selectors, callback, timeout, resolve, reject) {
    // EXAMPLE USAGE
    //
    // waitForExist(['foo'], render, 6000, resolve, emitSelectorTimeout);
    //

    var existInterval = setInterval(function() {
       if (selectors.every(function(ss) {
          return document.querySelector(ss);
          })) {
          callback();
          clearInterval(existInterval);
          existInterval = null;
          resolve();
       }    
    }, 50);
 
    function checkExist() {
        setTimeout(function() {
            if (existInterval) {
               clearInterval(existInterval);
               console.info(selectors);
               reject({ message : "Selectors not found: " + selectors.toString() });
            }    
         }, timeout);
    };

    docComplete(checkExist);
 };

 module.exports = {
     waitForExist: waitForExist,
     emitSelectorTimeout: emitSelectorTimeout,
     docComplete: docComplete,
     docReady: docReady
 };