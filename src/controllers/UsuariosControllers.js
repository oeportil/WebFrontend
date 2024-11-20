

export async function getEmpleados(){
    const emp = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/ObtenerDash`)
    if(emp.status !== 404){
        return emp.json()
    } else {
        return []
    }
}  
export async function getTecnicos(tec, email =""){
    const tecnic = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/ObtenerUsus/${tec}?busqueda=${email}`)
    if(tecnic.status !== 404){
        return tecnic.json()
    } else {
        return []
    }
   }

export async function getTecnicosforTicket(email = ""){
    const tecnic = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/ObtenerTecnicos?busqueda=${email}`)
      if(tecnic.status !== 404){
        return tecnic.json()
    } else {
        return []
    }
}

   export async function getRoles() {
    const rol = await fetch(`${import.meta.env.VITE_API_URL}/misc/ObtenerRoles`)
    return rol.json()
   }

   export async function createUsuario(user) {
        const usuario = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/CrearUsuario`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
              },
        })
        if(usuario.status === 200){
            return usuario.json()
        } else {
            return usuario.status
        }
   }

   export async function updateUsuario(user, id) {
    console.log(user)
    const usuario = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/EditarUsuario/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
          },
    })
    console.log(usuario)
    if(usuario.status === 200){
        return usuario.status
    } else {
        return usuario.status
    }
   }

   export async function getTecnicosByEmail(email=""){
        const tecnic = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/ObtenerUsus/2?busqueda=${email}`)
        if(tecnic.status != 404){
            const resultado = await tecnic.json()
            return resultado
        } else {
            return []
        }  
   }

