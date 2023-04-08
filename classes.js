// Guerreiro ou Mago
// Duende ou Troll
class Character {

    life = 1;
    maxlife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;

    }

    get life () {
        return this._life;
    }

    set life (newLife) {

        this._life = newLife < 0 ? 0 : newLife;
    }
}

// Criando o cavaleiro
class Warrior extends Character {
    constructor(name){
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8
        this.maxlife = this.life
    }
}

//Criando o mago
class Magician extends Character {
    constructor(name){
        super(name);
        this.life = 80;
        this. attack = 15;
        this.defense = 3;
        this.maxlife = this.life;
    }
}

class WhiteWalker extends Character {
    constructor(){
        super('White Walker');
        this.life = 40;
        this.attack = 4;
        this.defense = 0;
        this.maxlife = this.life
    }
}

class NightKing extends Character{
    constructor (){
        super('Night King');
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxlife = this.life
    }    
}
// exibindo a tela
class Stage {
    constructor (fighter1, fighter2, fighter1El, fighter2El,logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }
    // atualizando a tela
    start() {
        this.update();
        //eventos do botão de ataque

        this.fighter1El.querySelector('.attackButton').addEventListener('click',()=> this.doAttack(this.fighter1,this.fighter2)) // Quando o é clicado para atacar
        this.fighter2El.querySelector('.attackButton').addEventListener('click',()=> this.doAttack(this.fighter2,this.fighter1))
    }

    update(){
        //Fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(2)} HP`; // inserindo o nome do personagem        
        let f1pct = (this.fighter1.life/ this.fighter1.maxlife)*100; // porcentagem de vida
        this.fighter1El.querySelector('.bar').style.width = `${f1pct}%`; // atualização da barra de vida
        
        //Fighter 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(2)} HP`;
        let f2pct = (this.fighter2.life/this.fighter2.maxlife)*100; 
        this.fighter2El.querySelector('.bar').style.width = `${f2pct}%`; 
        
    }

    doAttack(attacking, attacked) { // Função de ataque. Quem atacou x quem recebeu o ataque O que vai aparecer no console.
        //verificar quem está morto
        if (attacking.life <= 0 || attacked.life <= 0){
            this.log.addMessage('Personagem fora de combate.');
            return;
        }
        // criar um fator de ataque
        let attackFactor = (Math.random()*2).toFixed(2);
        //criar fator de defesa
        let defenseFactor = (Math.random()*2).toFixed(2);
        //Métrica de ataque. Pode dar muito ou pouco dano
        let actualAttack = attacking.attack * attackFactor;
        //Metrica de defesa. Podendo reduzir dano.
        let actualDefense = attacked.defense * defenseFactor;

        if (actualAttack > actualDefense) { // condicional para resultado de dano final
            attacked.life -= actualAttack; // se o ataque for maior, será retirado pontos de vida
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`);
        }   else {
            this.log.addMessage(`${attacked.name} conseguiu defender`)
            }
        

        //console.log(`${attacking.name} está atacando ${attacked.name}`); log de ataque

        this.update();// Atualização dos dados de vida do personagem
    }

}

class Log {
    list = [];
    

    constructor (listEl){
        this.listEl = listEl;
    }

    addMessage(msg){
        this.list.push(msg);
        this.render();
    }

    render(){
        this.listEl.innerHTML = ''; //limpar a lista

        for(let i in this.list) {
            this.listEl.innerHTML += `<li> ${this.list[i]}</li>`
            } 
    }
}
