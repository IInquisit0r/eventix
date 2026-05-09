import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../api/events";
import ModalTicket from "../modal-ticket/modal-ticket";
import Header from "../header/header";
import { linkify } from "../../utils/linkify";
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

        console.log("EVENT:", data);

        setEvent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!event) {
    return <div>Событие не найдено</div>;
  }

  const image = event.images?.[0]?.image || null;

  const formatDate = (value) => {
    const ts = Number(value);

    if (!Number.isFinite(ts) || ts <= 0) {
      return null;
    }

    const date = new Date(ts * 1000);

    if (isNaN(date.getTime())) {
      return null;
    }

    return date.toLocaleDateString("ru-RU");
  };

  const dateObj = event.dates?.[0];

  const start = formatDate(dateObj?.start);
  const end = formatDate(dateObj?.end);

  let dateText = "Дата не указана";

  if (start && end) {
    dateText =
      start === end
        ? start
        : `${start} — ${end}`;
  } else if (start) {
    dateText = start;
  }

  const location =
    event.place?.title ||
    event.place?.address ||
    "Онлайн / не указано";

  const description =
    event.description || "Описание не указано";

  // ========================================
  // ОПРЕДЕЛЕНИЕ ЗАЛОВОГО СОБЫТИЯ
  // ========================================

  const isHallEvent = () => {
    const text = `
      ${event.title || ""}
      ${event.description || ""}
    `.toLowerCase();

    // уличные / свободные события
    const outdoorKeywords = [
      "прогулка",
      "экскурсия",
      "тур",
      "фестиваль",
      "квест",
      "улица",
      "парк",
      "на свежем воздухе",
      "пешая",
      "онлайн"
    ];

    // если найдено ключевое слово
    if (
      outdoorKeywords.some((word) =>
        text.includes(word)
      )
    ) {
      return false;
    }

    // если есть place.id — считаем заловым
    if (event.place?.id) {
      return true;
    }

    return false;
  };

  // ========================================
  // ЦЕНА
  // ========================================

  const getEventPrice = () => {
    if (event.is_free) {
      return "Бесплатно";
    }

    return (
      event.price ||
      event.tickets_price ||
      event.min_price ||
      "от 1200 ₽"
    );
  };

  // ========================================
  // КНОПКА КУПИТЬ
  // ========================================

  const handleBuyClick = () => {
    const isHall = isHallEvent();

    console.log("IS HALL EVENT:", isHall);

    // заловое событие → модалка
    if (isHall) {
      setShowModal(true);
      return;
    }

    // обычное событие → сайт
    const url =
      event.site_url || event.url;

    if (url) {
      window.open(url, "_blank");
    }
  };

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

        <h1 className="event-page__title">
          {event.title}
        </h1>

        <div className="event-page__meta">
          <span>
            📅 {dateText}
          </span>

          <span>
            📍 {location}
          </span>

          <span>
            💰 {getEventPrice()}
          </span>
        </div>

        <button
          className="event-page__button"
          onClick={handleBuyClick}
        >
          Купить билет
        </button>

        <div
          className="event-page__description"
          dangerouslySetInnerHTML={{
            __html: linkify(description),
          }}
        />
      </div>

      {showModal && (
        <ModalTicket
          event={event}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}