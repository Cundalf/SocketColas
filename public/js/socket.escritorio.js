var socket = io();

socket.on('connect', function () {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('Desconectado del servidor');
});

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('ubicacion')) {
    window.location = 'index.html';
    throw new Error('La ubicacion es necesaria.');
}

var ubicacion = searchParams.get('ubicacion');

$('h1').text('Ubicacion: ' + ubicacion);

$('button').on('click', function () {
    socket.emit('atenderTicket', { ubicacion }, function (resp) {
        if(resp === 'No hay tickets') {
            alert(resp);
            return;
        }

        $('small').text('Ticket ' + resp.nro);
    });
});