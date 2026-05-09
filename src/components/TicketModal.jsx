import { useMemo, useState } from "react";

export default function TicketModal({ event, onClose }) {
  const rows = 6;
  const seatsPerRow = 8;

  const [selectedSeats, setSelectedSeats] = useState([]);

  const parsePrice = () => {
  if (event.is_free) return 0;

  // если цена число
  if (typeof event.price === "number") {
    return event.price;
  }

  // если строка
  if (typeof event.price === "string") {
    const match = event.price.match(/\d+/);

    if (match) {
      return Number(match[0]);
    }
  }

  // fallback
  return 1200;
};

const ticketPrice = parsePrice();

  const occupiedSeats = [
    "1-3",
    "1-4",
    "2-6",
    "3-2",
    "4-7",
    "5-5",
  ];
  const seats = useMemo(() => {
    const arr = [];

    for (let row = 1; row <= rows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        arr.push({
          id: `${row}-${seat}`,
          row,
          seat,
        });
      }
    }

    return arr;
  }, []);

  const toggleSeat = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;

    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((s) => s !== seatId);
      }

      return [...prev, seatId];
    });
  };

  const totalPrice = selectedSeats.length * ticketPrice;

return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="ticket-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Выбор мест</h2>

          <button onClick={onClose}>✕</button>
        </div>

        <p className="modal-event-title">
          {event.title}
        </p>

        <div className="screen">
          ЭКРАН / СЦЕНА
        </div>

        <div className="seats-grid">
          {seats.map((seat) => {
            const isOccupied = occupiedSeats.includes(seat.id);

            const isSelected = selectedSeats.includes(seat.id);

            return (
              <button
                key={seat.id}
                className={`seat
                  ${isOccupied ? "occupied" : ""}
                  ${isSelected ? "selected" : ""}`}
                onClick={() => toggleSeat(seat.id)}
              >
              {seat.seat}
              </button>
            );
          })}
        </div>

        <div className="ticket-summary">
          <p>
            Выбрано мест: {selectedSeats.length}
          </p>

          <p>
            Цена билета: {ticketPrice} ₽
            <br />
            Сумма: {totalPrice} ₽
          </p>
        </div>

        <button
          className="buy-btn"
          disabled={!selectedSeats.length}
          onClick={() => {
            alert(
              `Покупка оформлена!\nМеста: ${selectedSeats.join(", ")}`
            );
          }}
        >
          Оплатить
        </button>
      </div>
    </div>
  );
}