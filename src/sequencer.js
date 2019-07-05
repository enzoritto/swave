export default class Sequencer {
  constructor (parent, notes, part) {
    this.rows = [];
    this.notes = notes;
    this.part = part;
    this.createNotes(parent, notes);
    this.initNotes();
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

  createNotes (parent, notes) {
    notes.forEach((note) => {
      console.log(parent);
      let row = parent.appendChild(document.createElement('tr'));
      row.insertAdjacentHTML('afterbegin', '<th class="note header">' + note + '</th>');
      for (let i = 0; i < 16; i++) {
        row.insertAdjacentHTML('beforeend', '<td class="note off"></td>');
      }
      this.rows.push(row);
    });
  }

  initNotes () {
    this.rows.forEach((row, i) => {
      Array.prototype.forEach.call(row.children, (e, j) => {
        if (e.classList.contains('note')) {
          e.addEventListener('click', () => {
            if (e.classList.contains('off')) {
              this.part = this.part.add({'time': '0:' + (j - 1), 'note': this.notes[i], 'duration': '4n', 'velocity':1});
              e.classList.replace('off', 'on');
            } else {
              this.part = this.part.remove('0:' + (j - 1));
              e.classList.replace('on', 'off');
            }
          });
        }
      });
    });
  }
}
