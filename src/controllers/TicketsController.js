
export async function getTicketsDasAdmin(){
    const tickets = await fetch(`${import.meta.env.VITE_API_URL}/Ticket/ObtenerDash`)
    if(tickets.status !== 404){
        return tickets.json()
    } else {
        return []
    }
}