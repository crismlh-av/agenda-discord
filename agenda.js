const https = require("https");

const url = process.env.DISCORD_WEBHOOK;

// Función para enviar cada bloque
function enviar(texto) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ content: texto });

    const req = https.request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length
      }
    }, (res) => {
      res.on("data", () => {});
      res.on("end", resolve);
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

// Calcular lunes y viernes de la próxima semana
const today = new Date();
const day = today.getDay();
const daysUntilNextMonday = (8 - day) % 7 || 7;
const nextMonday = new Date(today);
nextMonday.setDate(today.getDate() + daysUntilNextMonday);

const nextFriday = new Date(nextMonday);
nextFriday.setDate(nextMonday.getDate() + 4);

const options = { day: 'numeric', month: 'long' };
const mondayStr = nextMonday.toLocaleDateString('es-ES', options);
const fridayStr = nextFriday.toLocaleDateString('es-ES', options);

// Construimos los bloques (cada uno <2000 chars)
const bloques = [
  `📅 Agenda de la semana del ${mondayStr} al ${fridayStr} @everyone

Aquí tenéis los enlaces y horarios de las próximas sesiones:

━━━━━━━━━━━━━━
🔹 MARTES

🕣 08:30h · Sesión Q&A
👉 https://us06web.zoom.us/j/85283339254

📝 Envío de preguntas hasta el lunes a las 14:00h
👉 https://forms.gle/qNBTRp17cCCT5FRx9`,

  `🕤 09:30h - 11:00h · Taller semanal
👉 https://us06web.zoom.us/j/89601794176

━━━━━━━━━━━━━━
🔹 MIÉRCOLES

🕔 17:00h · Sesión Q&A
👉 https://us06web.zoom.us/j/87947402038

📝 Envío de preguntas hasta el miércoles a las 11:00h
👉 https://forms.gle/qNBTRp17cCCT5FRx9`,

  `━━━━━━━━━━━━━━

¡Os esperamos! 😊`
];

// Enviar cada bloque en orden
(async () => {
  for (const b of bloques) {
    await enviar(b);
  }
})();
