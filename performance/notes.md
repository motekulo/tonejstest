# Performance notes - js profiling

## Notes

Trying to work out why a simple part plays so badly out of time on mobile devices. Obviuosly something wrong with my code, as there are various working examples of Tone.js apps out there (and webaudio) that play perfectly in time on mobile devices.

A 4 second profile in the browser looking (amd sounding!) smooth:

![browser profile](screenshots/browser_profile_part.png)

And a 4 second profile from the aldi phone (not sounding so smooth):

![aldi phone profile](screenshots/aldi_phone_profile_part.png)

So some problems with Parts maybe?

We know the Aldi phone can play back webaudio smoothly; here's Chris Wilson's metronome program, for example:

![aldi phone profile metronome](screenshots/aldi_phone_profile_metronome.png)

Similar results when using a Tone.Sequence rather than a Tone.Part. Here's a profile running on the browser:

![browser profile](screenshots/browser_profile_sequence.png)

And on the phone:

![aldi phone profile](screenshots/aldi_phone_profile_sequence.png)

Profile of using a sequence in Tone.js on the Aldi phone: aldi_phone_sequence_TimelineRawData-20160720T180110.json


## Profile data

### browser_TimelineRawData-20160719T171045.json

Smooth timing; using crosswalk webview


### s4_024_TimelineRawData-20160719T172752.json

On S4,

    Tone.Clock.\_lookAhead = 0.024

Noticing framerate dropping to 32, and 33ms per frame at times

### metronome_wilson_aldi_phone_TimelineRawData-20160720T160547.json

Chris Wilson's metronome on aldi phone - plays back in time

### metronome_wilson_browser_TimelineRawData-20160720T160547.json

Chris Wilson's metronome on browser - plays back in time

### aldi_phone_TimelineRawData-20160720T154034.json

Perftest on Aldi phone - poor timing

### s4_024_TimelineRawData-20160719T172752.json

Perftest on samsung S4

### browser_TimelineRawData-20160719T171045.json

Perftest on browser

