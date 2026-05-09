import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// KudaGo API
const BASE_URL = "https://kudago.com/public-api/v1.4";

// 👇 добавили location
const EVENT_FIELDS =
  "id,title,images,dates,place,location,description,price,is_free,site_url";

// =======================
// 🎟 Список событий
// =======================
app.get("/api/events", async (req, res) => {
  try {
    const { page = 1, page_size = 60, location = "msk" } = req.query;

    const response = await axios.get(`${BASE_URL}/events/`, {
      params: {
        page,
        page_size,
        location,
        text_format: "plain",

        fields: EVENT_FIELDS,

        // 🔥 ВОТ ГЛАВНОЕ ИЗМЕНЕНИЕ
        order_by: "-publication_date",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("GET /api/events error:", error.message);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// =======================
// 🎟 Событие по ID
// =======================
app.get("/api/events/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(`${BASE_URL}/events/${id}/`, {
      params: {
        text_format: "plain",
        fields: EVENT_FIELDS,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("GET /api/events/:id error:", error.message);
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

app.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});