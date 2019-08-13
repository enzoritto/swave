import SequencerModel from '../model/sequencer';

export default class Sequencer {
  constructor(parent, instrument, part, quarters, bars) {
    this.notes = [{
        element: '',
        name: 'C3'
      },
      {
        element: '',
        name: 'C#3'
      },
      {
        element: '',
        name: 'D3'
      },
      {
        element: '',
        name: 'D#3'
      },
      {
        element: '',
        name: 'E3'
      },
      {
        element: '',
        name: 'F3'
      },
      {
        element: '',
        name: 'F#3'
      },
      {
        element: '',
        name: 'G3'
      },
      {
        element: '',
        name: 'G#3'
      },
      {
        element: '',
        name: 'A3'
      },
      {
        element: '',
        name: 'A#3'
      },
      {
        element: '',
        name: 'B3'
      }
    ].reverse();

    this.sequencerModel = new SequencerModel(instrument, part, this.notes, quarters, bars);
    this.createNotes(parent, this.notes);
    this.initNotes();
  }

  createNotes(parent, notes) {
    this.sequencer = document.createElement('table');
    this.sequencer.className = 'sequencer';
    let tableBody = document.createElement('tbody');
    notes.forEach((note) => {
      note.element = document.createElement('tr');
      if (note.name.includes('#')) {
        note.element.innerHTML = `
          <th class="note header black">${note.name}</th>
        `;
      } else {
        note.element.innerHTML = `
          <th class="note header white">${note.name}</th>
        `;
      }
      for (let i = 0; i < 16; i++) {
        var beat = document.createElement('td');
        beat.className = 'note off';
        note.element.append(beat);
      }
      tableBody.appendChild(note.element);
      this.sequencer.append(tableBody);
      parent.append(this.sequencer);
    });
  }

  initNotes() {
    this.notes.forEach((note, i) => {
      Array.prototype.forEach.call(note.element.children, (beat, j) => {
        beat.addEventListener('click', () => {
          if (beat.classList.contains('off')) {
            this.sequencerModel.addNote(i * j, j - 1, note.name);
            beat.classList.replace('off', 'on');
          } else {
            this.sequencerModel.removeNote(i * j);
            beat.classList.replace('on', 'off');
          }
        });
      });
    });
  }

  hideSequencer() {
    this.sequencer.classList.remove('active');
  }

  showSequencer() {
    this.sequencer.classList.add('active');
  }
}
