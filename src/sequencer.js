import Tone from 'tone';

export default class Sequencer {
  constructor (parent, notes, instrument) {
    this.rows = [];
    this.sequences = [];
    this.notes = notes;
    this.instrument = instrument;
    this.createRows(parent, notes);
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
      row.insertAdjacentHTML('afterbegin', '<th class="note header">' + note + '</th>');
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
      console.log(this.sequences[i].length);
      Array.prototype.forEach.call(row.children, (e, j) => {
        if (e.classList.contains('note')) {
          e.addEventListener('click', () => {
            if (e.classList.contains('off')) {
              this.sequences[i].add(j, this.notes[i]);
              e.classList.replace('off', 'on');
            } else {
              this.sequences[i].remove(j);
              e.classList.replace('on', 'off');
            }
          });
        }
      });
    });
  }
}
