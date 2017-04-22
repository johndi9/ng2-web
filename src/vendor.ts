// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// TODO(gdi2290): switch to DLLs

// Angular 2
import '@angular/animations';
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';
import '@angular/material';

// AngularClass
import '@angularclass/hmr';

// RxJS
require('rxjs/add/operator/map');
require('rxjs/add/operator/share');
require('rxjs/add/observable/of');
require('rxjs/add/operator/merge');
require('rxjs/add/operator/toArray');
require('rxjs/add/operator/delay');
require('rxjs/add/operator/pluck');
require('rxjs/add/operator/distinctUntilChanged');

if ('production' === ENV) {
  // Production


} else {
  // Development

}
