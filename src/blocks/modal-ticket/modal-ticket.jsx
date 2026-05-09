import { useMemo, useState } from "react";
import "./modal-ticket.css";

export default function ModalTicket({ event, onClose }) {
  const rows = 6;
  const seatsPerRow = 8;
  const [selectedSeats, setSelectedSeats] = useState([]);

  const parsePrice = () => {
    if (event.is_free) return 0;
    if (typeof event.price === "number") {
      return event.price;
    }
    if (typeof event.price === "string") {
      const match = event.price.match(/\d+/);
      if (match) {
        return Number(match[0]);
      }
    }
    return 1200;
  };

  const ticketPrice = parsePrice();

  const occupiedSeats = ["1-3", "1-4", "2-6", "3-2", "4-7", "5-5"];

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
    <div className="modal-ticket__overlay" onClick={onClose}>
      <div
        className="modal-ticket"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-ticket__header">
          <h2 className="modal-ticket__header-title">Выбор мест</h2>
          <button
            className="modal-ticket__header-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <p className="modal-ticket__event-title">{event.title}</p>
        <div className="modal-ticket__screen">ЭКРАН / СЦЕНА</div>
        <div className="modal-ticket__seats-grid">
          {seats.map((seat) => {
            const isOccupied = occupiedSeats.includes(seat.id);
            const isSelected = selectedSeats.includes(seat.id);
            return (
              <button
                key={seat.id}
                className={`modal-ticket__seat ${
                  isOccupied ? "modal-ticket__seat--occupied" : ""
                } ${isSelected ? "modal-ticket__seat--selected" : ""}`}
                onClick={() => toggleSeat(seat.id)}
                disabled={isOccupied}
              >
                {seat.seat}
              </button>
            );
          })}
        </div>
        <div className="modal-ticket__summary">
          <p className="modal-ticket__summary-item">
            Выбрано мест: {selectedSeats.length}
          </p>
          <p className="modal-ticket__summary-item">
            Цена билета: {ticketPrice} ₽
            <br />
            Сумма: {totalPrice} ₽
          </p>
        </div>
        <button
          className="modal-ticket__buy-btn"
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