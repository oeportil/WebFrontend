
export async function getTicketsDasAdmin(){
    const tickets = await fetch(`${import.meta.env.VITE_API_URL}/Ticket/ObtenerDash`)
    if(tickets.status !== 404){
        return tickets.json()
    } else {
        return []
    }
}

export async function getTicketsSinAsignar() {
    const tickets = await fetch(`${import.meta.env.VITE_API_URL}/Ticket/ObtenerSinAsignar`)
    if(tickets.status !== 404){
        return tickets.json()
    } else {
        return []
    }
}

export async function asginarTicketBD(id, tecnico){
    const asignar = await fetch(`${import.meta.env.VITE_API_URL}/Ticket/AsignarSoporte/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(tecnico),
        headers: {
            'Content-Type': 'application/json',
          }
    })
    return asignar.status
}

export async function getTicketPorEstado(objeto){
    const tickets = await fetch(`${import.meta.env.VITE_API_URL}/Ticket/ObtenerPorEstado`, {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json',
          }
    })
    if(tickets.status == 200){
        const resultado = await tickets.json()
       return resultado 
    } else{
        return tickets.status
    }
    
}

export async function getEstadisticas(){
    const estadisticas = await fetch(`${import.meta.env.VITE_API_URL}/Misc/ObtenerTiposTicket`)
    const resultado = await estadisticas.json()
    return resultado
}

export async function getDetalleTicket(id){
    const tickets = await fetch(`${import.meta.env.VITE_API_URL}/Ticket/ObtenerDetalle/${id}`)
    if(tickets.status !== 404){
        return tickets.json()
    } else {
        return {}
    }
}

export async function getEstados() {
    const estados = await fetch(`${import.meta.env.VITE_API_URL}/Misc/ObtenerEstados`)
    return estados.json()
}

export async function changeEstado(id, state) {
    const estado = await fetch(`${import.meta.env.VITE_API_URL}/Ticket/EditarTicket/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(state),
        headers: {
            'Content-Type': 'application/json',
          }
    })
    return estado.status
}