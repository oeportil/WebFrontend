

export async function getEmpleados(){
    const emp = await fetch(`${import.meta.env.VITE_API_URL}/Usuarios/ObtenerDash`)
    if(emp.status !== 404){
        return emp.json()
    } else {
        return []
    }
}  
export async function getTecnicos(){
    const tecnic = await fetch(`${import.meta.env.VITE_API_URL}/Usuarios/ObtenerUsus/2`)
    if(tecnic.status !== 404){
        return tecnic.json()
    } else {
        return []
    }
   }