

export async function getAdmin(){
    const admin = await fetch(`${import.meta.env.VITE_API_URL}/Usuarios/ObtenerUsus/3`)
    const resultado = await admin.json()
    console.log(resultado)
}