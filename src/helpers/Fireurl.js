export function convertirUrlFirebase(urlOriginal) {
  // Extraer el nombre del archivo (la parte después de 'o/')
  const regex = /o\/(.*)\?generation/;
  const match = urlOriginal.match(regex);

  if (match && match[1]) {
    const filePath = match[1];
    // Construir la nueva URL
    return `https://firebasestorage.googleapis.com/v0/b/pot1-tickets.appspot.com/o/${encodeURIComponent(
      filePath
    )}?alt=media`;
  } else {
    return null; // Si no coincide, devolver null o un valor adecuado
  }
}
