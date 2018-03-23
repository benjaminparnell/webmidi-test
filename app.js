var WebMidi = require('webmidi');

var root = document.getElementById('root');

WebMidi.enable(function(err) {
  if (err) {
    console.error('WebMidi could not be enabled', err);
  } else {
    console.log('WedMidi enabled');
  }

  console.log(WebMidi.inputs);
  console.log(WebMidi.outputs);

  function appendEvent(string) {
    var p = document.createElement('p');
    p.appendChild(document.createTextNode(string));
    root.appendChild(p);
  }

  function addKeyListeners(input) {
    input.addListener('noteon', 'all', function(event) {
      var string =
        'noteon ' +
        input.name +
        ' ' +
        input.manufacturer +
        ' ' +
        event.note.name +
        ' ' +
        event.node.octave;
      console.log(string);
      appendEvent(string);
    });

    input.addListener('noteoff', 'all', function(event) {
      var string =
        'noteoff ' +
        input.name +
        ' ' +
        input.manufacturer +
        ' ' +
        event.note.name +
        ' ' +
        event.node.octave;
      console.log(string);
      appendEvent(string);
    });
  }

  WebMidi.inputs.forEach(addKeyListeners);
});
