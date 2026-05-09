import { useNavigate } from "react-router-dom";
import "./event-card.css";

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
  if (start && end) {
    dateText = start === end ? start : `${start} — ${end}`;
  } else if (!start && end) {
    dateText = `до ${end}`;
  } else if (start) {
    dateText = start;
  }

  const location =
    event.place?.title ||
    event.place?.address ||
    (event.location?.slug === "msk" ? "Москва" : null) ||
    "Онлайн / не указано";

  return (
    <div className="event-card">
      {image && (
        <div className="event-card__image-wrapper">
          <img src={image} alt={event.title} className="event-card__image" />
          {event.is_free && (
            <div className="event-card__badge">Бесплатно</div>
          )}
        </div>
      )}
      <div className="event-card__content">
        <h3 className="event-card__title">{event.title}</h3>
        <p className="event-card__text">{dateText}</p>
        <p className="event-card__text">{location}</p>
        <button
          className="event-card__button"
          onClick={() => navigate(`/event/${event.id}`)}
        >
          Подробнее
        </button>
      </div>
    </div>
  );
}