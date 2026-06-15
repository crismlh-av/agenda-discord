const https = require("https");

const url = process.env.DISCORD_WEBHOOK;

function enviar(texto) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ content: texto });

    const req = https.request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data) // ← este es el fix
      }
    }, (res) => {
      console.log("Status:", res.statusCode);
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

const bloques = [
  `📅 Agenda de la semana del ${mondayStr} al ${fridayStr} @everyone\n\nAquí tenéis los enlaces y horarios de las próximas sesiones:\n\n━━━━━━━━━━━━━━\n🔹 MARTES\n\n🕣 08:30h · Sesión Q&A\n👉 https://us06web.zoom.us/j/85283339254\n\n📝 Envío de preguntas hasta el lunes a las 14:00h\n👉 https://forms.gle/qNBTRp17cCCT5FRx9`,

  `🕤 09:30h - 11:00h · Taller semanal\n👉 https://us06web.zoom.us/j/89601794176\n\n━━━━━━━━━━━━━━\n🔹 MIÉRCOLES\n\n🕔 17:00h · Sesión Q&A\n👉 https://us06web.zoom.us/j/87947402038\n\n📝 Envío de preguntas hasta el miércoles a las 11:00h\n👉 https://forms.gle/qNBTRp17cCCT5FRx9`,

  `━━━━━━━━━━━━━━\n\n¡Os esperamos! 😊`
];

enviar(bloques[0])
  .then(() => enviar(bloques[1]))
  .then(() => enviar(bloques[2]))
  .catch((err) => console.error("Error:", err));
