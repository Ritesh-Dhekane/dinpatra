type FeatureCardProps = {
  eyebrow: string
  title: string
  description: string
  bullets: readonly string[]
}

export function FeatureCard({
  eyebrow,
  title,
  description,
  bullets,
}: FeatureCardProps) {
  return (
    <article className="info-card">
      <p className="info-card__eyebrow">{eyebrow}</p>
      <h3 className="info-card__title">{title}</h3>
      <p className="info-card__description">{description}</p>
      <ul className="info-card__list">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}
