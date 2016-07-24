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
        init();
        //toneTest = new ToneTest();
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

var audioContext = null;
var isPlaying = false;
var lookahead = 25.0;       // How frequently to call scheduling function
                            //(in milliseconds)
var scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
                            // This is calculated from lookahead, and overlaps
                            // with next interval (in case the timer is late)
var nextNoteTime = 0.0;     // when the next note is due.
var beatNumber = 0;
var startTime;              // The start time of the entire sequence.
var current16thNote;        // What note is currently last scheduled?
var tempo = 120.0;          // tempo (in beats per minute)

var noteResolution = 1;     // 0 == 16th, 1 == 8th, 2 == quarter note
var noteLength = 0.05;      // length of "beep" (in seconds)
var notesInQueue = [];      // the notes that have been put into the web audio,
                            // and may or may not have played yet. {note, time}
var timerWorker = null;     // The Web Worker used to fire timer messages


//    Tone.Transport._clock._lookAhead = 0.5;
//    Tone.Transport._clock._threshold = 1.0;
    //Tone.Transport._ppq = 192;

//    Tone.Transport.loop = true;
//    Tone.Transport.loopStart = 0;
//    Tone.Transport.loopEnd = "1m";
//    Tone.Transport.bpm.value = 120;

function init() {
    //audioContext = new AudioContext();

    var instrument = new Tone.AMSynth();

    instrument.connect(Tone.Master);


    // timerWorker = new Worker("./worker/metronomeworker.js");
    //
    // timerWorker.onmessage = function(e) {
    //     if (e.data == "tick") {
    //         //console.log("tick!");
    //         scheduler();
    //     }
    //     else {
    //         console.log("message: " + e.data);
    //     }
    // };
    // timerWorker.postMessage({"interval":lookahead});

    // Beep on start
    //this.instrument.triggerAttackRelease("G4", "8n");
//    notes = [];

 var seq = new Tone.Sequence(function(time, note){

     instrument.triggerAttackRelease(note, "16n");
        //  var osc = audioContext.createOscillator();
        //  osc.connect( audioContext.destination );
        //  if (beatNumber % 16 === 0)    // beat 0 == high pitch
        //      osc.frequency.value = 880.0;
        //  else if (beatNumber % 4 === 0 )    // quarter notes = medium pitch
        //      osc.frequency.value = 440.0;
        //  else                        // other 16th notes = low pitch
        //      osc.frequency.value = 220.0;
         //
        //  osc.start( time );
        //  osc.stop( time + noteLength );
        //  beatNumber++;

    }, ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "E4"], "8n");

    seq.loop = true;
    seq.loopEnd = "1m";
    seq.start(0);
}

function scheduler() {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
        scheduleNote( current16thNote, nextNoteTime );
        nextNote();
        //console.log("Scheduler...");
    }
}

function nextNote() {
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / tempo;    // Notice this picks up the CURRENT
                                          // tempo value to calculate beat length.
    nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time

    current16thNote++;    // Advance the beat number, wrap to zero
    if (current16thNote == 16) {
        current16thNote = 0;
    }
}

function scheduleNote( beatNumber, time ) {
    // push the note on the queue, even if we're not playing.
    notesInQueue.push( { note: beatNumber, time: time } );

    if ( (noteResolution==1) && (beatNumber%2))
        return; // we're not playing non-8th 16th notes
    if ( (noteResolution==2) && (beatNumber%4))
        return; // we're not playing non-quarter 8th notes
    //this.instrument.triggerAttackRelease("C4", "16n");
    // create an oscillator
   var osc = audioContext.createOscillator();
   osc.connect( audioContext.destination );
   if (beatNumber % 16 === 0)    // beat 0 == high pitch
       osc.frequency.value = 880.0;
   else if (beatNumber % 4 === 0 )    // quarter notes = medium pitch
       osc.frequency.value = 440.0;
   else                        // other 16th notes = low pitch
       osc.frequency.value = 220.0;

   osc.start( time );
   osc.stop( time + noteLength );

}

function play(){
    isPlaying = !isPlaying;
    if (isPlaying) {
        // start playing
        // current16thNote = 0;
        // nextNoteTime = audioContext.currentTime;
        // timerWorker.postMessage("start");
        // return "stop";
        Tone.Transport.start();
    }
    else {
        Tone.Transport.stop();
        // timerWorker.postMessage("stop");
        // return "play";
    }

}
