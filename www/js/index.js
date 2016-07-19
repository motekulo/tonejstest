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

Tone.Transport.loop = true;
Tone.Transport.loopStart = 0;
Tone.Transport.loopEnd = "1m";
Tone.Transport.bpm.value = 116;

Tone.Transport.start();
this.instrument = new Tone.SimpleSynth();

this.instrument.connect(Tone.Master);
// Beep on start
this.instrument.triggerAttackRelease("G4", "8n");
notes = [];
this.part = new Tone.Part((function(time, note) {

    this.instrument.triggerAttackRelease(note, "16n");

}).bind(this), notes);


this.part.add("0:0:0 + 0 * 8n", "C4");
this.part.add("0:0:0 + 1 * 8n", "D4");
this.part.add("0:0:0 + 2 * 8n", "E4");
this.part.add("0:0:0 + 3 * 8n", "F4");
this.part.add("0:0:0 + 4 * 8n", "G4");
this.part.add("0:0:0 + 5 * 8n", "A4");
this.part.add("0:0:0 + 6 * 8n", "B4");
this.part.add("0:0:0 + 7 * 8n", "E4");

this.part.loop = true;
this.part.loopEnd = "4m";
this.part.start(0);
