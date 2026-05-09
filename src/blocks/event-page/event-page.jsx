import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../api/events";
import ModalTicket from "../modal-ticket/modal-ticket";
import Header from "../header/header";
import linkify from "../../utils/linkify";
import "./event-page.css";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (!event) return <div>Событие не найдено</div>;

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

  const description = event.description || "Описание не указано";

  return (
    <>
      <Header />
      <div className="event-page">
        {image && (
          <img
            src={image}
            alt={event.title}
            className="event-page__cover"
          />
        )}
        <h1 className="event-page__title">{event.title}</h1>
        <div className="event-page__meta">
          <span className="event-page__meta-item">📅 {dateText}</span>
          <span className="event-page__meta-item">📍 {location}</span>
          {event.is_free && (
            <span className="event-page__meta-item">✓ Бесплатно</span>
          )}
        </div>
        <button
          className="event-page__button"
          onClick={() => setShowModal(true)}
        >
          Купить билет
        </button>
        <div
          className="event-page__description"
          dangerouslySetInnerHTML={{ __html: linkify(description) }}
        />
      </div>
      {showModal && (
        <ModalTicket event={event} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}