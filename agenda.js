const https = require("https");

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

const message = `
📅 Agenda de la semana del ${mondayStr} al ${fridayStr} @everyone

Aquí tenéis los enlaces y horarios de las próximas sesiones:

━━━━━━━━━━━━━━
🔹 MARTES

🕣 08:30h · Sesión Q&A
👉 https://us06web.zoom.us/j/85283339254

📝 Envío de preguntas hasta el lunes a las 14:00h
👉 https://forms.gle/qNBTRp17cCCT5FRx9

🕤 09:30h - 11:00h · Taller semanal
👉 https://us06web.zoom.us/j/89601794176

━━━━━━━━━━━━━━
🔹 MIÉRCOLES

🕔 17:00h · Sesión Q&A
👉 https://us06web.zoom.us/j/87947402038

📝 Envío de preguntas hasta el miércoles a las 11:00h
👉 https://forms.gle/qNBTRp17cCCT5FRx9

━━━━━━━━━━━━━━

¡Os esperamos! 😊
`;

const data = JSON.stringify({ content: message });

const url = process.env.DISCORD_WEBHOOK;

const req = https.request(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length
  }
});

req.write(data);
req.end();
