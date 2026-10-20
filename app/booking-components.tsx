export function BookingEmbed() {
  return (
    <div className="sa-booking-calendar" data-booking-vendor="oncehub">
      <h2>Choose a time for your free consultation</h2>
      <p className="sa-booking-fallback">If the scheduler does not load, <a href="https://go.oncehub.com/StealthAgentsTeam" rel="noopener noreferrer">open the secure OnceHub booking page</a>.</p>
      <iframe
        src="https://go.oncehub.com/StealthAgentsTeam"
        title="Free staffing consultation scheduler"
        className="sa-oncehub-frame"
        scrolling="yes"
        loading="eager"
        allow="fullscreen"
      />
    </div>
  );
}
