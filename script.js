// Objeto Cine
const cine = {
    nombre: "Cinemark",
    salas: [
        {
            id: 1,
            capacidad: 50,
            asientosDisponibles: Array.from({length: 50}, (_, i) => i + 1),
            asientosReservados: []
        }
    ],
    
    // Método para obtener una sala por su ID
    obtenerSala: function(id) {
        return this.salas.find(sala => sala.id === id);
    },
    
    // Método para reservar un asiento
    reservarAsiento: function(salaId, asiento) {
        const sala = this.obtenerSala(salaId);
        if (!sala) return false;
        
        const index = sala.asientosDisponibles.indexOf(asiento);
        if (index !== -1) {
            sala.asientosDisponibles.splice(index, 1);
            sala.asientosReservados.push(asiento);
            return true;
        }
        return false;
    },
    
    // Método para cancelar una reserva
    cancelarReserva: function(salaId, asiento) {
        const sala = this.obtenerSala(salaId);
        if (!sala) return false;
        
        const index = sala.asientosReservados.indexOf(asiento);
        if (index !== -1) {
            sala.asientosReservados.splice(index, 1);
            sala.asientosDisponibles.push(asiento);
            sala.asientosDisponibles.sort((a, b) => a - b);
            return true;
        }
        return false;
    },
    
    // Método para mostrar asientos disponibles
    mostrarDisponibles: function(salaId) {
        const sala = this.obtenerSala(salaId);
        if (!sala) return [];
        
        return sala.asientosDisponibles;
    }
};

// Elementos del DOM
const cineNombre = document.getElementById('cine-nombre');
const salaActual = document.getElementById('sala-actual');
const asientoInput = document.getElementById('asiento-input');
const btnReservar = document.getElementById('btn-reservar');
const btnCancelar = document.getElementById('btn-cancelar');
const btnDisponibles = document.getElementById('btn-disponibles');
const asientosContainer = document.getElementById('asientos-container');
const mensaje = document.getElementById('mensaje');

// Configuración inicial
cineNombre.textContent = cine.nombre;
const salaId = 1; // Usamos la sala 1 para este ejemplo
salaActual.textContent = salaId;

// Función para mostrar los asientos
function mostrarAsientos() {
    const sala = cine.obtenerSala(salaId);
    asientosContainer.innerHTML = '';
    
    for (let i = 1; i <= sala.capacidad; i++) {
        const asiento = document.createElement('div');
        asiento.className = `asiento ${sala.asientosDisponibles.includes(i) ? 'disponible' : 'reservado'}`;
        asiento.textContent = i;
        asientosContainer.appendChild(asiento);
    }
}

// Event listeners
btnReservar.addEventListener('click', () => {
    const numeroAsiento = parseInt(asientoInput.value);
    
    if (isNaN(numeroAsiento) || numeroAsiento < 1 || numeroAsiento > 50) {
        mostrarMensaje('Por favor, ingrese un número de asiento válido (1-50)', 'error');
        return;
    }
    
    if (cine.reservarAsiento(salaId, numeroAsiento)) {
        mostrarMensaje(`Asiento ${numeroAsiento} reservado con éxito`, 'exito');
        mostrarAsientos();
    } else {
        mostrarMensaje(`El asiento ${numeroAsiento} no está disponible`, 'error');
    }
    
    asientoInput.value = '';
});

btnCancelar.addEventListener('click', () => {
    const numeroAsiento = parseInt(asientoInput.value);
    
    if (isNaN(numeroAsiento) || numeroAsiento < 1 || numeroAsiento > 50) {
        mostrarMensaje('Por favor, ingrese un número de asiento válido (1-50)', 'error');
        return;
    }
    
    if (cine.cancelarReserva(salaId, numeroAsiento)) {
        mostrarMensaje(`Reserva del asiento ${numeroAsiento} cancelada con éxito`, 'exito');
        mostrarAsientos();
    } else {
        mostrarMensaje(`El asiento ${numeroAsiento} no está reservado`, 'error');
    }
    
    asientoInput.value = '';
});

btnDisponibles.addEventListener('click', () => {
    const disponibles = cine.mostrarDisponibles(salaId);
    mostrarMensaje(`Asientos disponibles: ${disponibles.join(', ')}`, 'exito');
});

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = tipo;
}

// Inicializar la visualización de asientos
mostrarAsientos();