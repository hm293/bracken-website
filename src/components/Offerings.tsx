import { ScrollReveal } from './ui/ScrollReveal'
import { OfferingIcon } from './ui/OfferingIcons'

interface Offering {
  id: string
  title: string
  description: string
  duration: string
  category: string
  icon: string
  sortOrder: number
}

interface OfferingsProps {
  offerings: Offering[]
}

const categoryLabels: Record<string, string> = {
  group: 'Group Experiences',
  corporate: 'Corporate Wellness',
  individual: 'Individual Sessions',
  immersive: 'Immersive Rituals & Retreats',
}

const categoryOrder = ['group', 'corporate', 'individual', 'immersive']

export function Offerings({ offerings }: OfferingsProps) {
  const grouped = categoryOrder
    .map((cat) => ({
      key: cat,
      label: categoryLabels[cat],
      items: offerings
        .filter((o) => o.category === cat)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    }))
    .filter((g) => g.items.length > 0)

  return (
    <section id="offerings" className="relative py-20 md:py-30 bg-warm-sand grain-overlay">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <ScrollReveal className="text-center mb-14 md:mb-18">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-bracken-taupe mb-4">
            Offerings
          </p>
          <h2 className="text-4xl md:text-5xl text-deep-earth mb-5">Sound Experiences</h2>
          <p className="text-stone text-base md:text-[17px] prose-constrained mx-auto">
            All sessions can be adapted to create bespoke experiences tailored to your group.
          </p>
        </ScrollReveal>

        <ScrollReveal type="animate-stagger" className="space-y-14">
          {grouped.map((group) => (
            <div key={group.key}>
              <h3 className="offering-category-header font-display text-2xl md:text-3xl text-deep-earth">
                {group.label}
              </h3>
              <ScrollReveal
                type="animate-cards"
                className={`grid sm:grid-cols-2 ${group.items.length > 2 ? 'lg:grid-cols-4' : ''} gap-5`}
              >
                {group.items.map((offering) => (
                  <div
                    key={offering.id}
                    className="card-interactive bg-ritual-cream p-6 rounded-sm shadow-brand-sm cursor-pointer"
                    tabIndex={0}
                  >
                    <OfferingIcon icon={offering.icon} />
                    <h4 className="font-display text-xl text-deep-earth mb-2">{offering.title}</h4>
                    <p className="text-stone text-sm leading-relaxed mb-3">{offering.description}</p>
                    <span className="font-sans text-xs text-bracken-taupe uppercase tracking-wider">
                      {offering.duration}
                    </span>
                  </div>
                ))}
              </ScrollReveal>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
