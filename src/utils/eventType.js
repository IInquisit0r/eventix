export const isHallEvent = (event) => {
  if (!event) return false;

  const title = (event.title || "").toLowerCase();

  const outdoorKeywords = [
    "прогулка",
    "экскурсия",
    "тур",
    "онлайн",
    "квест",
    "маршрут",
    "по городу"
  ];

  const isOutdoor = outdoorKeywords.some((w) =>
    title.includes(w)
  );

  const hasVenue = Boolean(event.place?.title);

  return hasVenue && !isOutdoor;
};