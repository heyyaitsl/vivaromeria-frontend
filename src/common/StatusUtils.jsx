export function getStatus(num) {
    const status={
        1: 'Realizado',
        2: 'Cancelado',
        3: 'Pendiente'
    }

    return status[num] || 'Desconocido';
}

export function getStatusClass(num) {
    const statusClass={
        1: 'status-completed',
        2: 'status-canceled',
        3: 'status-pending'
    }
    return statusClass[num] || 'status-unknown';
    
}