export function getStatus(num) {
    const status={
        1: 'Finalizada',
        2: 'Cancelada',
        3: 'Próximamente'
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