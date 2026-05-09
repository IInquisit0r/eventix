import "./filters.css";

export default function Filters({ search, setSearch, onlyFree, setOnlyFree }) {
  return (
    <div className="filters">
      <input
        type="text"
        className="filters__search"
        placeholder="Поиск событий..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <label className="filters__toggle">
        <input
          type="checkbox"
          className="filters__toggle-checkbox"
          checked={onlyFree}
          onChange={() => setOnlyFree(!onlyFree)}
        />
        <span className="filters__toggle-slider"></span>
        <span className="filters__toggle-text">Только бесплатные</span>
      </label>
    </div>
  );
}