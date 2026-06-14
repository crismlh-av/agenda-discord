const https = require("https");

const url = process.env.DISCORD_WEBHOOK;

console.log("🔍 Webhook recibido:", url ? "OK" : "VACÍO");
console.log("🔍 Longitud:", url ? url.length : 0);

// Si no hay URL, salimos
if (!url) {
  console.error("❌ No se ha recibido DISCORD_WEBHOOK");
  process.exit(1);
}

// Construimos el mensaje
const message = {
  content: "Mensaje de prueba desde GitHub Actions"
};

const data = JSON.stringify(message);

console.log("🔍 Enviando mensaje a Discord...");

const req = https.request(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length
  }
}, (res) => {
  console.log("🔍 Código de respuesta:", res.statusCode);

  res.on("data", (chunk) => {
    console.log("🔍 Respuesta:", chunk.toString());
  });

  res.on("end", () => {
    console.log("✅ Petición finalizada");
  });
});

req.on("error", (err) => {
  console.error("❌ Error en la petición HTTPS:", err);
});

req.write(data);
req.end();
