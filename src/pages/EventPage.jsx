import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../api/events";
import TicketModal from "../components/TicketModal";

export default function EventPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getEventById(id).then(setEvent);
  }, [id]);

  if (!event) {
    return <p style={{ padding: "40px" }}>Загрузка...</p>;
  }

  const image = event.images?.[0]?.image;

  const startDate = event.dates?.[0]?.start;

  const formattedDate = startDate
    ? new Date(startDate * 1000).toLocaleDateString("ru-RU")
    : "Дата не указана";

  const location =
    event.place?.title ||
    "Москва";

  const title = event.title?.toLowerCase() || "";

  const isHallEvent =
    title.includes("концерт") ||
    title.includes("спектакль") ||
    title.includes("кино") ||
    title.includes("фильм") ||
    title.includes("театр") ||
    title.includes("выставка") ||
    title.includes("шоу");

  return (
    <div className="event-page">
      {image && (
        <img
          src={image}
          alt={event.title}
          className="event-cover"
        />
      )}

      <h1 className="event-title">
        {event.title}
      </h1>
      {showModal && (
        <TicketModal
          event={event}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="event-meta">
        <span>📅 {formattedDate}</span>

        <span>📍 {location}</span>

        <span>
          💰 {event.price || (event.is_free ? "Бесплатно" : "Цена не указана")}
        </span>
      </div>

     <button
        onClick={() => {
          if (isHallEvent) {
            setShowModal(true);
          } else {
            window.open(event.site_url, "_blank");
          }
        }}
      >
  Купить билет
</button>

      <div
        className="event-description"
        dangerouslySetInnerHTML={{
          __html: event.description,
        }}
      />
    </div>
  );
}