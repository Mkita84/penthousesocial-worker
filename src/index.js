import express from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

// In-memory job store (temporary for testing)
const jobs = new Map();

// ================================
// Health Check
// ================================
app.get("/", (req, res) => {
  res.send("🚀 Penthouse Social HQ Worker Running");
});

// ================================
// CREATE GENERATE JOB
// ================================
app.post("/generate", async (req, res) => {
  try {
    const payload = req.body || {};
    const jobId = crypto.randomUUID();

    const job = {
      id: jobId,
      status: "queued",
      createdAt: new Date().toISOString(),
      payload,
      result: null,
      error: null
    };

    jobs.set(jobId, job);

    // Simulate background processing
    setTimeout(() => {
      const current = jobs.get(jobId);
      if (!current) return;

      current.status = "processing";
      jobs.set(jobId, current);

      setTimeout(() => {
        const finished = jobs.get(jobId);
        if (!finished) return;

        finished.status = "completed";
        finished.result = {
          message: "Mock generate complete",
          motion: true,
          beatSync: true,
          voiceover: true
        };
        finished.completedAt = new Date().toISOString();

        jobs.set(jobId, finished);
      }, 1500);
    }, 500);

    return res.json({
      ok: true,
      jobId,
      statusUrl: `/status/${jobId}`
    });

  } catch (err) {
    console.error("Generate error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

// ================================
// CHECK JOB STATUS
// ================================
app.get("/status/:jobId", (req, res) => {
  const { jobId } = req.params;
  const job = jobs.get(jobId);

  if (!job) {
    return res.status(404).json({ ok: false, error: "Job not found" });
  }

  return res.json({ ok: true, job });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Worker running on port ${PORT}`);
});
