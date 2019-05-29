!function(r,e){for(var t in e)r[t]=e[t]}(exports,function(r){var e={};function t(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return r[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=r,t.c=e,t.d=function(r,e,n){t.o(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:n})},t.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},t.t=function(r,e){if(1&e&&(r=t(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var i in r)t.d(n,i,function(e){return r[e]}.bind(null,i));return n},t.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return t.d(e,"a",e),e},t.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},t.p="",t(t.s=0)}([function(r,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.maxLength=e.minLength=e.isEmailAddressList=e.isEmailAddress=e.isRequired=e.useValidateForm=void 0;var n=Object.assign||function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(r[n]=t[n])}return r},i=function(){return function(r,e){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return function(r,e){var t=[],n=!0,i=!1,u=void 0;try{for(var o,a=r[Symbol.iterator]();!(n=(o=a.next()).done)&&(t.push(o.value),!e||t.length!==e);n=!0);}catch(r){i=!0,u=r}finally{try{!n&&a.return&&a.return()}finally{if(i)throw u}}return t}(r,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),u=t(1);function o(r){if(Array.isArray(r)){for(var e=0,t=Array(r.length);e<r.length;e++)t[e]=r[e];return t}return Array.from(r)}function a(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}e.useValidateForm=function(r){var e=Object.entries(r).reduce(function(r,e){var t=i(e,2),u=t[0],o=t[1],l=o.initialValue,f=o.validators,c=s(l,f,!1),d=c.isValid,v=c.errors,y=c.isDirty;return n({},r,{fields:n({},r.fields,a({},u,{value:l,isValid:d,isDirty:y,errors:v,name:u,validators:f}))})},{isDirty:!1});return(0,u.useReducer)(l,n({},e,{isValid:Object.values(e.fields).every(function(r){return r.isValid}),hasErrors:Object.values(e.fields).some(function(r){return r.errors.length>0})}))};var s=function(r,e,t){return e.reduce(function(e,n){var i=n.error;return(0,n.func)(r)?e:{errors:t?[].concat(o(e.errors),[i]):[],isValid:!1,isDirty:t}},{errors:[],isValid:!0,isDirty:!t})},l=function(r,e){var t=e.type,n=e.payload,i=n.name,u=n.value;switch(t){case"SET_VALUE":return f(r,i,u,!1);case"VALIDATE":return f(r,i,u,!0);default:throw new Error("Action must be of type INIT, SET_VALUE or VALIDATE")}},f=function(r,e,t,i){var u=r.fields[e].validators,o=s(t,u,i),l=o.isValid,f=o.errors,c=o.isDirty,d=n({},r,{fields:n({},r.fields,a({},e,{value:t,isValid:l,errors:f,isDirty:c,name:e,validators:u}))});return n({},d,{isDirty:Object.values(d.fields).some(function(r){return r.name!==e&&r.isDirty})?d.isDirty:c,isValid:!!l&&Object.values(d.fields).every(function(r){return r.isValid}),hasErrors:Object.values(d.fields).some(function(r){return r.errors.length>0})})},c=/[^@]+@[^.]+\..+/;e.isRequired={func:function(r){return!!r&&r.length>0},error:"This field is required"},e.isEmailAddress={func:function(r){return!r||c.test(r)},error:"Please enter a valid email address"},e.isEmailAddressList={func:function(r){return r.every(function(r){return c.test(r)})},error:"Please enter valid email addresses"},e.minLength=function(r){return{func:function(e){return!e||e.length>=r},error:"This field has a minimum length of "+r}},e.maxLength=function(r){return{func:function(e){return!e||e.length<=r},error:"This field has a maximum length of "+r}}},function(r,e){r.exports=require("react")}]));