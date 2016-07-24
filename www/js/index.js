/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        toneTest = new ToneTest();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

var isPlaying = false;

var ToneTest = function(){
    Tone.Transport._clock._lookAhead = 0.5;
    Tone.Transport._clock._threshold = 1.0;
    //Tone.Transport._ppq = 192;

    Tone.Transport.loop = true;
    Tone.Transport.loopStart = 0;
    Tone.Transport.loopEnd = "1m";
    Tone.Transport.bpm.value = 120;

    this.instrument = new Tone.SimpleSynth();

    this.instrument.connect(Tone.Master);
    // Beep on start
    //this.instrument.triggerAttackRelease("G4", "8n");
    notes = [];

    var seq = new Tone.Sequence((function(time, note){

        this.instrument.triggerAttackRelease(note, "16n");
        //console.log("Note: " + note);

    }).bind(this), ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "E4"], "8n");

    seq.loop = true;
    seq.loopEnd = "1m";
    seq.start(0);

}

function play(){
    isPlaying = !isPlaying;
    if (isPlaying) {
        // start playing
        Tone.Transport.start();
    }
    else {
        Tone.Transport.stop();
    }

}
