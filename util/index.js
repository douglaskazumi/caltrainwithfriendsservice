"use strict";

module.exports = {
  formatAMPM: formatAMPM,
  sleep: sleep,
  getDateOnly: getDateOnly,
  prettyPrint: prettyPrint,
  uniqueBy: uniqueBy
};

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

function getDateOnly(dateTime) {
  var dd = dateTime.getDate();
  var mm = dateTime.getMonth() + 1;
  var yyyy = dateTime.getFullYear();

  return mm + '/' + dd + '/' + yyyy;
}

function prettyPrint(object, tag) {
  console.log(">>>>>>> " + tag + " >>>>>>>>>>");
  console.log(JSON.stringify(object, null, 2));
  console.log("-------END " + tag + " ------");
}

function uniqueBy(a, key) {
  var seen = {};
  return a.filter(function(item) {
    var k = key(item);
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  });
}