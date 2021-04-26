const mongoose = require('mongoose');

const category = new mongoose.Schema({
    category: {type: String, enum: ['PAD','BELL','LEAD','PLUCK','KEYS','BASS','PERCUSION']}
});

const categoryModel = mongoose.model('category',category);

const envelope = new mongoose.Schema({
    attack: {type: Number},
    decay: {type: Number},
    sustain: {type: Number},
    release: {type: Number}
});

const envelopeModel =  mongoose.model('envelope',envelope);

const oscillator = new mongoose.Schema({
    id: {type: String },
    pan: {type: Number},
    oscOn: {type: Boolean},
    wave: {type: String},
    envelope: envelope
});
const oscillatorModel =  mongoose.model('oscillator',oscillator);

const delay = new mongoose.Schema({
    effectOn: {type: Boolean},
    wet: {type: Number},
    time: {type: Number},
    feedback: {type: Number}
});
const delayModel =  mongoose.model('delay',delay);

const distorsion = new mongoose.Schema({
    effectOn: {type: Boolean},
    wet: {type: Number},
    amount: {type: Number},
});
const distorsionModel =  mongoose.model('distorsion',distorsion);

const filter = new mongoose.Schema({
    effectOn: {type: Boolean},
    wet: {type: Number},
    type: {type: String},
    frequency: {type: Number}
});
const filterModel =  mongoose.model('filter',filter);

const reverb = new mongoose.Schema({
    effectOn: {type: Boolean},
    wet: {type: Number},
    hp: {type: Number},
    lp: {type: Number},
    decay: {type: Number}
});

const reverbModel =  mongoose.model('reverb',reverb);

const stateSchema = new mongoose.Schema({
    name: {type: String},
    userID: {type: String},
    description: {type: String},
    value: {type: Number},
    category: category,
    oscA: oscillator,
    oscB: oscillator,
    delay: delay,
    distorsion: distorsion,
    filter: filter,
    reverb: reverb
})

const stateModel =  mongoose.model('states',stateSchema);

module.exports = {
    stateModel,
    envelopeModel,
    oscillatorModel,
    reverbModel,
    delayModel,
    distorsionModel,
    filterModel,
    categoryModel
}