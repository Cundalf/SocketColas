const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');
    
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.SiguienteTicket();
        
        callback(siguiente);
    });
    
    client.emit('estadoActual', {
        actual: ticketControl.GetUltimoTicket(),
        llamados: ticketControl.GetLlamados()
    });
    
    client.on('atenderTicket', (data, callback) => {
        if(!data.ubicacion) {
            return callback({
                err: true,
                mensaje: 'La ubicacion es necesaria'
            });
        }
        
        let atenderTicket = ticketControl.AtenderTicket(data.ubicacion);
        
        callback(atenderTicket);
        
        client.broadcast.emit('llamados', {
            llamados: ticketControl.GetLlamados()
        });
    });

});