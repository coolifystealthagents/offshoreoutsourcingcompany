export function BookingEmbed() {
  return (
    <div className="sa-booking-calendar" data-booking-vendor="oncehub">
      <h2>Choose a time for your free consultation</h2>
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
