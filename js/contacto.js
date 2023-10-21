const form = document.getElementById("contacto__form");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;
    const email = document.getElementById("email").value;
    const file = document.getElementById("file");
    const selectedFile = file.files[0];
    const body = document.getElementById("body").value;

    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]{4,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (selectedFile) {
        if (!selectedFile.type.startsWith('image/')) {
            file.value = "";
            triggerToast("El tipo de archivo no es válido.❌");
            return
        };
    };

    if (nombre.trim() === "") {
        triggerToast("❌Nombre y Apellido no pueden estar vacíos.❌");
    } else if (!phoneRegex.test(telefono)) {
        triggerToast("❌Número de Teléfono no es válido.❌");
    } else if (direccion.trim() === "") {
        triggerToast("❌La dirección no puede estar vacía.❌");
    } else if (email.trim() === "") {
        triggerToast("El Correo Electrónico no puede estar vacío.❌");
    } else if (!emailRegex.test(email)) {
        triggerToast("❌Correo Electrónico no es válido.❌");
    } else if (body.trim() === "") {
        triggerToast("❌El campo de Mensaje no puede estar vacío.❌");
    } else {
        sendMail(nombre, telefono, direccion, email, body);
    };
});

const triggerToast = (message)=>{
    Toastify({
        text: message,
        duration: 2000,
        close: true,
        gravity: "bottom",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #FFD100, #f5921d)",
            color: "#000000"
        },
    }).showToast();
}

// No agregue la posibildiad de enviar el archivo porque creo que no es compatible con la version gratuita de formspree
const sendMail = (nombre, telefono, direccion, email, body) => {
    const data = new FormData();
    data.append("nombre", nombre);
    data.append("telefono", telefono);
    data.append("direccion", direccion);
    data.append("email", email);
    data.append("body", body);

    const endpoint = 'https://formspree.io/f/mpzgbzbk';

    fetch(endpoint, {
        method: "POST",
        body: data,
        headers: {
            "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            triggerToast("Tu mensaje ha sido enviado correctamente 😀");
        } else {
            triggerToast("Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo. 🤔");
        }
    })
    .catch(error => {
        triggerToast("Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo. 🤔");
    });
};
