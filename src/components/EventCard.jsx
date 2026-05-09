import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  const image = event.images?.[0]?.image || null;

  const formatDate = (value) => {
    const ts = Number(value);

    if (!Number.isFinite(ts) || ts <= 0) return null;

    const date = new Date(ts * 1000);

    if (isNaN(date.getTime())) return null;

    return date.toLocaleDateString("ru-RU");
  };

  const dateObj = event.dates?.[0];

  const startRaw = dateObj?.start;
  const endRaw = dateObj?.end;

  const start = formatDate(startRaw);
  const end = formatDate(endRaw);

  let dateText = "Дата не указана";

  // ✔ нормальный интервал
  if (start && end) {
    dateText = start === end ? start : `${start} — ${end}`;
  }

  // ✔ только конец
  else if (!start && end) {
    dateText = `до ${end}`;
  }

  // ✔ только старт
  else if (start) {
    dateText = start;
  }

  const location =
    event.place?.title ||
    event.place?.address ||
    (event.location?.slug === "msk" ? "Москва" : null) ||
    "Онлайн / не указано";

  return (
    <div className="card">
      {image && (
        <div className="card-image-wrapper">
          <img src={image} alt={event.title} />

          {event.is_free && (
            <div className="free-badge">
              Бесплатно
            </div>
          )}
        </div>
      )}

      <div className="card-content">
        <h3>{event.title}</h3>

        <p>{dateText}</p>

        <p>{location}</p>

        <button onClick={() => navigate(`/event/${event.id}`)}>
          Подробнее
        </button>
      </div>
    </div>
  );
}