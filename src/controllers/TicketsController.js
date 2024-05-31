
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
    console.log(tecnico)
    const asignar = await fetch(`${import.meta.env.VITE_API_URL}/Ticket/AsignarSoporte/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(tecnico),
        headers: {
            'Content-Type': 'application/json',
          }
    })
    return asignar.status
}