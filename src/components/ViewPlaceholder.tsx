type ViewPlaceholderProps = {
  title: string
  description: string
}

export function ViewPlaceholder({ title, description }: ViewPlaceholderProps) {
  return (
    <section className="view-placeholder panel" aria-label={title}>
      <div className="view-placeholder__copy">
        <p className="view-placeholder__eyebrow">Coming soon</p>
        <h2 className="view-placeholder__title">{title}</h2>
        <p className="view-placeholder__description">{description}</p>
      </div>
    </section>
  )
}
