export default function BackgroundAnim() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle at 8% 12%, rgba(13, 148, 136, 0.08), transparent 42%), radial-gradient(circle at 88% 85%, rgba(20, 184, 166, 0.07), transparent 45%), radial-gradient(circle at 75% 42%, rgba(13, 148, 136, 0.05), transparent 38%)",
      }}
    />
  );
}
