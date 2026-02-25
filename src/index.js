import express from "express";

const app = express();
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Penthouse Social HQ Worker Running");
});

// Export endpoint (foundation for motion engine later)
app.post("/export", async (req, res) => {
  const { projectId, type, settings } = req.body;

  console.log("Export job received:", {
    projectId,
    type,
    settings
  });

  // Placeholder for:
  // 🎬 Cinematic Motion Engine
  // 🎵 Beat Sync System
  // 🎙 AI Voiceover Layer

  res.json({
    status: "queued",
    message: `Export job queued for ${type}`,
    projectId
  });
});
// ==============================
// TEST GENERATE ENDPOINT
// ==============================

app.post("/generate", async (req, res) => {
  try {
    const payload = req.body;

    console.log("Generate job received:", payload);

    return res.json({
      ok: true,
      received: payload,
      at: new Date().toISOString(),
    });

  } catch (err) {
    console.error("Generate error:", err);
    return res.status(500).json({
      ok: false,
      error: "Server error"
    });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Worker running on port ${PORT}`);
});
