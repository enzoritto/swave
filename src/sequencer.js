import Tone from 'tone';

export default class Sequencer {
  constructor(parent, instrument, part) {
    this.rows = [];
    this.sequences = [];
    this.value = new Array(12 * 16);
    this.part = part;
    this.notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3'].reverse();
    this.instrument = instrument;
    this.createRows(parent, this.notes);
    this.initRows();
  }

  hideRows() {
    this.sequencerEl.classList.remove('active');
  }

  revealRows() {
    this.sequencerEl.classList.add('active');
  }

  createRows(parent, notes) {
    this.sequencerEl = document.createElement('table');
    this.sequencerEl.innerHTML = `<tbody></tbody>`;
    parent.appendChild(this.sequencerEl);
    notes.forEach((note) => {
      let row = document.createElement('tr');
      if (note.includes('#')) {
        row.insertAdjacentHTML('afterbegin', '<th class="note header black">' + note + '</th>');
      } else {
        row.insertAdjacentHTML('afterbegin', '<th class="note header white">' + note + '</th>');
      }
      for (let i = 0; i < 16; i++) {
        row.insertAdjacentHTML('beforeend', '<td class="note off"></td>');
      }
      this.sequencerEl.children[0].appendChild(row);
      this.rows.push(row);
    });
  }

  initRows() {
    this.rows.forEach((row, i) => {
      Array.prototype.forEach.call(row.children, (e, j) => {
        if (e.classList.contains('note')) {
          e.addEventListener('click', () => {
            if (e.classList.contains('off')) {
              this.value.splice(j * i, 1, {
                "time": `0:${j - 1}`,
                "note": this.notes[i]
              });
              this.part.add(this.value[j * i]);
              this.instrument.triggerAttackRelease(this.notes[i], '8n');
              e.classList.replace('off', 'on');
            } else {
              this.part.remove(this.value[j * i]);
              e.classList.replace('on', 'off');
            }
          });
        }
      });
    });
  }
}
