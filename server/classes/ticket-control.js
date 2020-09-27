const fs = require('fs');

class Ticket {
    constructor(nro, ubicacion) {
        this.nro = nro;
        this.ubicacion = ubicacion;
    }
}

class TicketControl {
    
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.llamados = [];
        
        let data = require('../data/data.json');
        
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.llamados = data.llamados;
        } else {
            this.ReiniciarArchivo();
        }
    }
    
    ReiniciarArchivo() {
        this.ultimo = 0;
        this.tickets = [];
        this.llamados = [];
        this.GrabarArchivo();
    }
    
    GrabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            llamados: this.llamados
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
    
    SiguienteTicket() {
        this.ultimo += 1;
        this.GrabarArchivo();
        
        let ticket = new Ticket(this.ultimo, null);
        
        this.tickets.push(ticket);
        
        return `Ticket ${this.ultimo}`;
    }
    
    GetUltimoTicket(){
        return `Ticket ${this.ultimo}`;
    }
    
    AtenderTicket(ubicacion) {
        if(this.tickets.length === 0) {
            return 'No hay tickets';
        }
        
        let numeroTicket = this.tickets[0].nro;
        this.tickets.shift();
    
        let atenderTicket = new Ticket(numeroTicket, ubicacion);
        
        this.llamados.unshift(atenderTicket);
        
        if(this.llamados.length > 4) {
            this.llamados.splice(-1,1);
        }
        
        this.GrabarArchivo();
        
        return atenderTicket;
    }
    
    GetLlamados() {
        return this.llamados;
    }
}

module.exports = {
    TicketControl
};