import { useState } from "react";
import "./modal-ticket.css";

export default function ModalTicket({ event, onClose }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seats = Array.from({ length: 40 }, (_, i) => i + 1);
  const occupiedSeats = [3, 7, 12, 18, 25];

  const getPrice = () => {
  if (event.is_free) return 0;

  const price =
    event.price ||
    event.tickets_price ||
    event.min_price ||
    "";

  const match = String(price).match(/\d+/);

  return match ? Number(match[0]) : 1200;
};

  const totalPrice = selectedSeats.length * getPrice();

  const toggleSeat = (seat) => {
    if (occupiedSeats.includes(seat)) return;

    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const handleBuy = () => {
    alert(
      `Покупка оформлена!\n\n` +
      `Места: ${selectedSeats.join(", ")}\n` +
      `Сумма: ${totalPrice} ₽`
    );

    onClose();
  };

  return (
    <div className="modal-ticket-overlay" onClick={onClose}>
      <div className="modal-ticket" onClick={(e) => e.stopPropagation()}>

        <div className="modal-ticket__header">
          <h2>Выбор мест</h2>
          <button onClick={onClose}>×</button>
        </div>

        <div className="modal-ticket__event-title">
          {event.title}
        </div>

        <div className="modal-ticket__grid">
          {seats.map((seat) => {
            const isSelected = selectedSeats.includes(seat);
            const isOccupied = occupiedSeats.includes(seat);

            return (
              <button
                key={seat}
                disabled={isOccupied}
                onClick={() => toggleSeat(seat)}
                className={
                  isSelected
                    ? "seat selected"
                    : isOccupied
                    ? "seat occupied"
                    : "seat"
                }
              >
                {seat}
              </button>
            );
          })}
        </div>

        <div className="modal-ticket__summary">
          <span>Билеты: {selectedSeats.length}</span>
          <span>Сумма: {totalPrice} ₽</span>
        </div>

        <button
          className="modal-ticket__buy-button"
          disabled={selectedSeats.length === 0}
          onClick={handleBuy}
        >
          Купить
        </button>

      </div>
    </div>
  );
}