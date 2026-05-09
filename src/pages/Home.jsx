import { useEffect, useMemo, useState } from "react";
import { getEvents } from "../api/events";
import Header from "../blocks/header/header";
import Hero from "../blocks/hero/hero";
import Filters from "../blocks/filters/filters";
import EventGrid from "../blocks/event-grid/event-grid";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [onlyFree, setOnlyFree] = useState(false);

  // =========================
  // Загрузка событий
  // =========================
  const loadEvents = async (pageNumber) => {
    try {
      setLoading(true);
      const data = await getEvents(pageNumber);
      setEvents((prev) => {
        const merged = [...prev, ...data];
        // удаляем дубликаты по id
        const uniqueEvents = merged.filter(
          (event, index, self) =>
            index === self.findIndex((e) => e.id === event.id)
        );
        return uniqueEvents;
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Первая загрузка
  // =========================
  useEffect(() => {
    async function fetchInitialEvents() {
      await loadEvents(1);
    }
    fetchInitialEvents();
  }, []);

  // =========================
  // ФИЛЬТРАЦИЯ
  // =========================
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // поиск
    if (search.trim()) {
      result = result.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // бесплатные
    if (onlyFree) {
      result = result.filter((event) => event.is_free);
    }

    return result;
  }, [events, search, onlyFree]);

  // =========================
  // Показать ещё
  // =========================
  const handleLoadMore = async () => {
    if (loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    await loadEvents(nextPage);
  };

  return (
    <div>
      <Header />
      <Hero />
      <Filters
        search={search}
        setSearch={setSearch}
        onlyFree={onlyFree}
        setOnlyFree={setOnlyFree}
      />
      <EventGrid events={filteredEvents} />
      <div style={{ textAlign: "center", padding: "20px" }}>
        <button
          className="event-grid__load-more"
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading ? "Загрузка..." : "Показать ещё"}
        </button>
      </div>
    </div>
  );
}