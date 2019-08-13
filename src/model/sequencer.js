import Tone from 'tone';

export default class Sequencer {
  constructor(instrument, part, notes, quarters, bars) {
    this.part = part;
    this.instrument = instrument;

    this.value = new Array(notes.length * (quarters * bars));
  }

  addNote(index, time, note) {
    this.value.splice(index, 1, {
      "time": `0:${time}`,
      "note": note
    });
    this.part.add(this.value[index]);
    this.instrument.triggerAttackRelease(note, '8n');
  }

  removeNote(index) {
    this.part.remove(this.value[index]);
  }
}
