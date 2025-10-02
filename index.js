import express from "express";
import ytdl from "ytdl-core";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Permitir peticiones desde cualquier origen (para desarrollo)
app.use(cors());

// Endpoint para descargar vídeo de YouTube
app.get("/download", async (req, res) => {
  const url = req.query.url;

  if (!url || (!url.includes("youtube.com") && !url.includes("youtu.be"))) {
    return res.status(400).send("400: Not a YouTube link found");
  }

  try {
    // Nombre de archivo dinámico
    const filename = `video-${Date.now()}.mp4`;
    
    // Indicar al navegador que es descarga
    res.header("Content-Disposition", `attachment; filename="${filename}"`);
    
    // Stream del vídeo
    ytdl(url, { format: "mp4" }).pipe(res);
  } catch (error) {
    console.error("Error downloading video:", error);
    res.status(500).send("Error downloading video");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
