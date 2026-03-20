import { getPayload } from 'payload'
import config from '@payload-config'
export const dynamic = 'force-dynamic'

import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { About } from '@/components/About'
import { Offerings } from '@/components/Offerings'
import { Testimonials } from '@/components/Testimonials'
import { Gallery } from '@/components/Gallery'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { BackToTop } from '@/components/BackToTop'

// Default content used as fallback when CMS data is not yet available
const defaultAboutHtml = `
<p>My relationship with sound began early, shaped by an upbringing that valued ritual, deep listening, and connection. From a young age, I experienced sound not simply as something we hear, but as a subtle and powerful tool for calm, reflection, and emotional wellbeing.</p>
<p>In 2015, during my own journey with stress, I experienced firsthand the calming effects of sound. This became a turning point, leading me to train as a certified Sound Healing Practitioner and commit to sharing sound as an accessible, restorative practice.</p>
<p>Today, I create intentional sound experiences that feel grounding and welcoming — weaving voice, instruments, guided meditation, and simple movement to create inclusive, deeply restorative spaces.</p>
`

const defaultOfferings = [
  { id: '1', title: 'Sacred Sound Journey', description: 'Immersive sound bath using rattles, Tibetan bowls, gongs, crystal singing bowls, flute, and chimes.', duration: '1–1.5 hours', category: 'group', icon: 'crystal-bowl', sortOrder: 1 },
  { id: '2', title: 'Sound Bath & Song', description: 'Sound bath with live vocals, blending voice and instruments to deepen relaxation and presence.', duration: '1 hour', category: 'group', icon: 'sound-wave', sortOrder: 2 },
  { id: '3', title: 'Sound & Sharing Circle', description: 'Sound bath followed by guided connection exercises and sharing for personal reflection and communal connection.', duration: '2 hours', category: 'group', icon: 'circle', sortOrder: 3 },
  { id: '4', title: 'Sauna Sound Rituals', description: 'Multi-sensory journey with guided sound in sauna heat, cold plunging, and elemental meditation across four sets.', duration: 'Multi-session', category: 'group', icon: 'flame', sortOrder: 4 },
  { id: '5', title: 'Nervous System Reset', description: 'Private sound bath workshop held onsite or at a local venue, designed to support relaxation, focus, and stress relief.', duration: '1–2 hours', category: 'corporate', icon: 'brain', sortOrder: 1 },
  { id: '6', title: 'Nature Connection Retreat', description: 'Glamping retreats combining restorative sound baths, sauna and cold plunge, firemaking, organic meals, and guided nature walks.', duration: '1–2 days', category: 'corporate', icon: 'leaf', sortOrder: 2 },
  { id: '7', title: 'Bespoke 1:1 Sound Healing', description: 'Personalised sound bath on a cosy houseboat or in your home. Sessions begin with a welcome drink and may include guided meditation, body sound work, and optional tarot readings.', duration: '1–3 hours', category: 'individual', icon: 'bowl-mallet', sortOrder: 1 },
  { id: '8', title: 'Sound Sanctuary: Day Retreat', description: 'Beginning with a cacao or tea ceremony. Includes a 2-hour sound bath with guided meditation, journalling, gentle movement, and a sharing circle.', duration: '5 hours', category: 'immersive', icon: 'sun', sortOrder: 1 },
  { id: '9', title: 'Sound Bath & Moon Ceremony', description: 'Lunar-aligned ritual with cacao ceremony, 1.5-hour sound bath, guided meditation, journalling, and movement. Releasing on the full moon, setting intentions with the new.', duration: '3 hours', category: 'immersive', icon: 'moon', sortOrder: 2 },
]

const defaultTestimonials = [
  { id: '1', quote: "Bracken works with sound with such reverence and she fiercely protects the space — I could feel a deep surrender in the room which was a direct reflection of the safety she cultivates. I absolutely recommend her!", attribution: 'Anonymous', sortOrder: 1 },
  { id: '2', quote: "Bracken's sound bath was incredible! She's an expert space holder, who creates safety and trust in her craft. She integrated sound within a breathwork journey, and I found the whole experience to be deep, immersive and healing.", attribution: 'Anonymous', sortOrder: 2 },
  { id: '3', quote: "I participated in one of Bracken's soundbaths after a day full of activities and it was simply the most lovely reset. She creatively weaves together different instruments and sound frequencies which took me into a deep relaxation. It was a beautiful experience.", attribution: 'Anonymous', sortOrder: 3 },
  { id: '4', quote: "My experience in this session is so incredibly special to me because I found a level of healing I have never seen before. Holly led the session whilst catering to every level of experience. The session was paired with a beautiful sound healing session led by Bracken and these two practises worked so well together.", attribution: 'Kate Luke', sortOrder: 4 },
  { id: '5', quote: "Holly's breathwork was beautiful and intense!! There was so much powerful energy being created in that room. We had beautiful sounds from the amazing Bracken which soothed the soul and made me smile. It is magical and profound — it gets to the root of your trauma and releases it in a beautiful way.", attribution: 'Louise Rowley', sortOrder: 5 },
]

async function getData() {
  try {
    const payload = await getPayload({ config })

    const [siteSettings, offerings, testimonials, gallery] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings' }),
      payload.find({ collection: 'offerings', limit: 100, sort: 'sortOrder' }),
      payload.find({ collection: 'testimonials', limit: 100, sort: 'sortOrder' }),
      payload.find({ collection: 'gallery', limit: 100, sort: 'sortOrder' }),
    ])

    return { siteSettings, offerings: offerings.docs, testimonials: testimonials.docs, gallery: gallery.docs }
  } catch {
    // Fallback when database is not available (e.g., first build)
    return null
  }
}

export default async function HomePage() {
  const data = await getData()

  // Use CMS data if available, otherwise fall back to defaults
  const siteName = data?.siteSettings?.siteName || 'Sacred Sound Sister'
  const tagline = data?.siteSettings?.tagline || 'Rest is the medicine'
  const aboutHeading = data?.siteSettings?.aboutHeading || 'Meet Bracken'
  const contactEmail = data?.siteSettings?.contactEmail || 'Bracken.roots7@gmail.com'
  const contactPhone = data?.siteSettings?.contactPhone || '+44 7596 086607'
  const footerText = data?.siteSettings?.footerText || '© 2026 Sacred Sound Sister. All rights reserved.'
  const instagramHandles = (data?.siteSettings?.instagramHandles as { handle: string; url: string }[] | undefined)?.length
    ? (data!.siteSettings.instagramHandles as { handle: string; url: string }[])
    : [
        { handle: 'sacred.sound.sister', url: '#' },
        { handle: 'brackenroots', url: '#' },
      ]

  const heroImageUrl = typeof data?.siteSettings?.heroImage === 'object' && data.siteSettings.heroImage
    ? (data.siteSettings.heroImage as { url?: string }).url
    : undefined
  const aboutImageUrl = typeof data?.siteSettings?.aboutImage === 'object' && data.siteSettings.aboutImage
    ? (data.siteSettings.aboutImage as { url?: string }).url
    : undefined

  // For about body, use CMS rich text if available, otherwise default
  const aboutHtml = defaultAboutHtml

  const offerings = data?.offerings?.length
    ? data.offerings.map((o) => ({
        id: String(o.id),
        title: o.title || '',
        description: o.description || '',
        duration: o.duration || '',
        category: o.category || '',
        icon: o.icon || 'crystal-bowl',
        sortOrder: o.sortOrder || 0,
      }))
    : defaultOfferings

  const testimonials = data?.testimonials?.length
    ? data.testimonials.map((t) => ({
        id: String(t.id),
        quote: t.quote || '',
        attribution: t.attribution || '',
        sortOrder: t.sortOrder || 0,
      }))
    : defaultTestimonials

  const galleryImages = data?.gallery?.length
    ? data.gallery.map((g) => ({
        id: String(g.id),
        alt: g.alt || '',
        aspectRatio: g.aspectRatio || 'square',
        sortOrder: g.sortOrder || 0,
        image: typeof g.image === 'object' && g.image ? { url: (g.image as { url?: string }).url } : { url: '' },
      }))
    : []

  return (
    <>
      <Header />
      <main id="main">
        <Hero
          siteName={siteName}
          tagline={tagline}
          heroImageUrl={heroImageUrl}
        />
        <WaveDivider />
        <About
          heading={aboutHeading}
          bodyHtml={aboutHtml}
          imageUrl={aboutImageUrl}
        />
        <WaveDivider />
        <Offerings offerings={offerings} />
        <WaveDivider />
        <Testimonials testimonials={testimonials} />
        <WaveDivider />
        {galleryImages.length > 0 && <Gallery images={galleryImages} />}
        {galleryImages.length > 0 && <WaveDivider />}
        <Contact
          email={contactEmail}
          phone={contactPhone}
          instagramHandles={instagramHandles}
        />
      </main>
      <Footer footerText={footerText} />
      <BackToTop />
    </>
  )
}
