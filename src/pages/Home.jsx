import EventList from "../components/EventList";

export default function Home() {
  return (
    <div>
      <header className="header">
        <div className="logo">EVENTIX</div>

        <button>Москва</button>
      </header>

      <section className="hero">
        <h1>Найди лучшие события Москвы</h1>

        <p>
          Концерты, выставки, спектакли, экскурсии,
          фестивали и вечеринки — всё в одном месте.
        </p>
      </section>

      <EventList />
    </div>
  );
}