function validateInput(event) {
    const input = event.target.value;
    const warningMessage = document.getElementById('warningMessage');
    const regex = /^[a-z\s]*$/;

    if (!regex.test(input)) {
        warningMessage.style.display = 'block';
    } else {
        warningMessage.style.display = 'none';
    }
}

function condicionesInicales() {
    // Vamos a mostrar en el título el mensaje de bienvenida
    asignarTextoElemento('h1', 'Challenge de Alura!');
    // Vamos a mostrar en el párrafo el mensaje de indicar un número
    asignarTextoElemento('p', 'Ingrese el texto por favor');
}

function asignarTextoElemento(elemento, texto) {
    // Aquí traemos un objeto y lo almacenamos en una variable
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    if (elemento === 'h1') {
        elementoHTML.style.color = '#ffffff'; // Color gris oscuro
    } else if (elemento === 'p') {
        elementoHTML.style.color = '#ffffff'; // Color gris medio
    }
    return;
}

function getValorUsuario() {
    const valorUsuario = document.getElementById('valorUsuario').value;
    return valorUsuario;
}

function contarVocales(texto) {
    const vocales = 'aeiou';
    let contador = 0;
    for (let char of texto) {
        if (vocales.includes(char)) {
            contador++;
        }
    }
    return contador;
}

function encriptartexto() {
    const input = getValorUsuario();
    const warningMessage = document.getElementById('warningMessage');
    const regex = /^[a-z\s]*$/;

    if (!regex.test(input)) {
        warningMessage.style.display = 'block';
        return; // No realizar la encriptación
    } else {
        warningMessage.style.display = 'none';
    }

    const numeroDeVocales = contarVocales(input);
    
    // Lógica de encriptación aquí
    const encriptado = input
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
    
    // Mostramos el resultado en el elemento de resultado
    document.getElementById('resultado').innerHTML = `Número de vocales: ${numeroDeVocales}<br>Texto encriptado: <span id="textoEncriptado">${encriptado}</span>`;

    // Desactivar el botón de desencriptar
    document.getElementById('desencriptarButton').disabled = true;
    document.getElementById('encriptarButton').disabled = false; // Habilitar el botón de encriptar
}

function desencriptartexto() {
    const input = getValorUsuario();
    const warningMessage = document.getElementById('warningMessage');
    const regex = /^[a-z\s]*$/;

    if (!regex.test(input)) {
        warningMessage.style.display = 'block';
        return; // No realizar la desencriptación
    } else {
        warningMessage.style.display = 'none';
    }

    // Lógica de desencriptación aquí
    const desencriptado = input
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');

    // Mostramos el resultado en el elemento de resultado
    document.getElementById('resultado').innerHTML = `Texto desencriptado: <span id="textoDesencriptado">${desencriptado}</span>`;

    // Desactivar el botón de encriptar
    document.getElementById('encriptarButton').disabled = true;
    document.getElementById('desencriptarButton').disabled = false; // Habilitar el botón de desencriptar
}

function copiarTexto() {
    const textoEncriptado = document.getElementById('textoEncriptado');
    const textoDesencriptado = document.getElementById('textoDesencriptado');
    let textoACopiar = '';

    if (textoEncriptado) {
        textoACopiar = textoEncriptado.innerText;
    } else if (textoDesencriptado) {
        textoACopiar = textoDesencriptado.innerText;
    }

    navigator.clipboard.writeText(textoACopiar).then(() => {
        alert('Texto copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
}

function pegarTexto() {
    navigator.clipboard.readText().then(textoPegado => {
        document.getElementById('valorUsuario').value = textoPegado;
        document.getElementById('desencriptarButton').disabled = false; // Habilitar el botón de desencriptar al pegar texto
        document.getElementById('encriptarButton').disabled = false; // Habilitar el botón de encriptar al pegar texto
    }).catch(err => {
        console.error('Error al pegar el texto: ', err);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const resultado = document.getElementById('resultado');
    const copiarButton = document.getElementById('copiarButton');

    function checkContent() {
        if (resultado.textContent.trim() !== '') {
            copiarButton.disabled = false;
        } else {
            copiarButton.disabled = true;
        }
    }

    // Verificar el contenido inicialmente
    checkContent();

    // Verificar el contenido cada vez que cambie
    const observer = new MutationObserver(checkContent);
    observer.observe(resultado, { childList: true, subtree: true, characterData: true });
});

function limpiarTexto() {
    document.getElementById('valorUsuario').value = '';
    document.getElementById('resultado').innerHTML = 'No hay ningún texto encontrado para encriptar o desencriptar';
    document.getElementById('warningMessage').style.display = 'none';
    document.getElementById('desencriptarButton').disabled = false; // Habilitar el botón de desencriptar al limpiar
    document.getElementById('encriptarButton').disabled = false; // Habilitar el botón de encriptar al limpiar
}

condicionesInicales();