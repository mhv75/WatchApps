var filename = 'tasks.json';
var settings = require("Storage").readJSON(filename,1)|| { tasks: [] };

function updateSettings() {
  require("Storage").writeJSON(filename, settings);
  Bangle.buzz();
}

function twoChat(n){
  if(n<10) return '0'+n;
  return ''+n;
}

const mainMenu = settings.tasks.reduce(function(m, p, i){
  const name = twoChat(p.quantity)+' '+p.name;
  m[name] = {
    value: p.ok,
    format: v => v?'[x]':'[ ]',
    onchange: v => {
      settings.tasks[i].ok = v;
      updateSettings();
    }
  };
  return m;
}, {
  '': { 'title': 'Routine List' }
});
mainMenu['< Back'] = ()=>{load();};
E.showMenu(mainMenu);
