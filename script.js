let log = new Log(document.querySelector('.log'));

let char = new Warrior ('Jon Snow');
let monster = new NightKing();

const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
);

stage.start();

