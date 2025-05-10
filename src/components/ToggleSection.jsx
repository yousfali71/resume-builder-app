export default function ToggleSection({
  title,
  className,
  isVisible,
  toggleVisibility,
  children,
}) {
  const toggleClass = `${className} ${isVisible ? "visible" : "hidden"}`;

  return (
    <div className="section-wrapper">
      <p className="header2 collapsible-input" onClick={toggleVisibility}>
        {title}
        <button className="expand-button">{isVisible ? "-" : "+"}</button>
      </p>
      <div className={toggleClass}>{children}</div>
    </div>
  );
}
