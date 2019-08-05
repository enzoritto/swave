import Tone from 'tone';

export default class Sequencer {
  constructor (parent, instrument) {
    this.rows = [];
    this.sequences = [];
    this.notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3'].reverse();
    this.instrument = instrument;
    this.createRows(parent, this.notes);
    this.initRows();
  }

  hideRows () {
    this.rows.forEach((row) => {
      row.style.display = 'none';
    });
  }

  revealRows () {
    this.rows.forEach((row) => {
      row.style.display = 'table-row';
    });
  }

  createRows (parent, notes) {
    notes.forEach((note) => {
      let row = parent.appendChild(document.createElement('tr'));
      if (note.includes('#')) {
        row.insertAdjacentHTML('afterbegin', '<th class="note header black">' + note + '</th>');
      } else {
        row.insertAdjacentHTML('afterbegin', '<th class="note header white">' + note + '</th>');
      }
      for (let i = 0; i < 16; i++) {
        row.insertAdjacentHTML('beforeend', '<td class="note off"></td>');
      }
      this.rows.push(row);
    });
  }

  initRows () {
    this.rows.forEach((row, i) => {
      this.sequences.push(new Tone.Sequence((time, note) => {
        if (note !== null) this.instrument.triggerAttackRelease(note, '8n');
      }, new Array(16)).start());
      this.sequences[i].loop = true;
      this.sequences[i].loopEnd = '4m';
      this.sequences[i].loopStart = 0;
      this.sequences[i].humanize = true;
      Array.prototype.forEach.call(row.children, (e, j) => {
        if (e.classList.contains('note')) {
          e.addEventListener('click', () => {
            if (e.classList.contains('off')) {
              this.sequences[i].add(j - 1, this.notes[i]);
              this.instrument.triggerAttackRelease(this.notes[i], '8n');
              e.classList.replace('off', 'on');
            } else {
              this.sequences[i].remove(j - 1);
              e.classList.replace('on', 'off');
            }
          });
        }
      });
    });
  }
}
