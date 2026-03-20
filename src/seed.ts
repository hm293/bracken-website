import { getPayload } from 'payload'
import config from './payload.config'
import path from 'path'
import fs from 'fs'

const offerings = [
  { title: 'Sacred Sound Journey', description: 'Immersive sound bath using rattles, Tibetan bowls, gongs, crystal singing bowls, flute, and chimes.', duration: '1–1.5 hours', category: 'group' as const, icon: 'crystal-bowl' as const, sortOrder: 1 },
  { title: 'Sound Bath & Song', description: 'Sound bath with live vocals, blending voice and instruments to deepen relaxation and presence.', duration: '1 hour', category: 'group' as const, icon: 'sound-wave' as const, sortOrder: 2 },
  { title: 'Sound & Sharing Circle', description: 'Sound bath followed by guided connection exercises and sharing for personal reflection and communal connection.', duration: '2 hours', category: 'group' as const, icon: 'circle' as const, sortOrder: 3 },
  { title: 'Sauna Sound Rituals', description: 'Multi-sensory journey with guided sound in sauna heat, cold plunging, and elemental meditation across four sets.', duration: 'Multi-session', category: 'group' as const, icon: 'flame' as const, sortOrder: 4 },
  { title: 'Nervous System Reset', description: 'Private sound bath workshop held onsite or at a local venue, designed to support relaxation, focus, and stress relief.', duration: '1–2 hours', category: 'corporate' as const, icon: 'brain' as const, sortOrder: 1 },
  { title: 'Nature Connection Retreat', description: 'Glamping retreats combining restorative sound baths, sauna and cold plunge, firemaking, organic meals, and guided nature walks.', duration: '1–2 days', category: 'corporate' as const, icon: 'leaf' as const, sortOrder: 2 },
  { title: 'Bespoke 1:1 Sound Healing', description: 'Personalised sound bath on a cosy houseboat or in your home. Sessions begin with a welcome drink and may include guided meditation, body sound work, and optional tarot readings.', duration: '1–3 hours', category: 'individual' as const, icon: 'bowl-mallet' as const, sortOrder: 1 },
  { title: 'Sound Sanctuary: Day Retreat', description: 'Beginning with a cacao or tea ceremony. Includes a 2-hour sound bath with guided meditation, journalling, gentle movement, and a sharing circle.', duration: '5 hours', category: 'immersive' as const, icon: 'sun' as const, sortOrder: 1 },
  { title: 'Sound Bath & Moon Ceremony', description: 'Lunar-aligned ritual with cacao ceremony, 1.5-hour sound bath, guided meditation, journalling, and movement. Releasing on the full moon, setting intentions with the new.', duration: '3 hours', category: 'immersive' as const, icon: 'moon' as const, sortOrder: 2 },
]

const testimonials = [
  { quote: "Bracken works with sound with such reverence and she fiercely protects the space — I could feel a deep surrender in the room which was a direct reflection of the safety she cultivates. I absolutely recommend her!", attribution: 'Anonymous', sortOrder: 1 },
  { quote: "Bracken's sound bath was incredible! She's an expert space holder, who creates safety and trust in her craft. She integrated sound within a breathwork journey, and I found the whole experience to be deep, immersive and healing.", attribution: 'Anonymous', sortOrder: 2 },
  { quote: "I participated in one of Bracken's soundbaths after a day full of activities and it was simply the most lovely reset. She creatively weaves together different instruments and sound frequencies which took me into a deep relaxation. It was a beautiful experience.", attribution: 'Anonymous', sortOrder: 3 },
  { quote: "My experience in this session is so incredibly special to me because I found a level of healing I have never seen before. Holly led the session whilst catering to every level of experience. The session was paired with a beautiful sound healing session led by Bracken and these two practises worked so well together.", attribution: 'Kate Luke', sortOrder: 4 },
  { quote: "Holly's breathwork was beautiful and intense!! There was so much powerful energy being created in that room. We had beautiful sounds from the amazing Bracken which soothed the soul and made me smile. It is magical and profound — it gets to the root of your trauma and releases it in a beautiful way.", attribution: 'Louise Rowley', sortOrder: 5 },
]

// Gallery images: 9 photos mapped to the grid pattern (square, wide, square, wide, square, square, square, wide, square)
const galleryImages = [
  { file: 'IMG_8082.JPG', alt: 'Sound healing session with singing bowls', aspectRatio: 'square' as const, sortOrder: 1 },
  { file: 'IMG_8055.JPG', alt: 'Group sound bath experience', aspectRatio: 'wide' as const, sortOrder: 2 },
  { file: 'IMG_8073.JPG', alt: 'Crystal singing bowls arrangement', aspectRatio: 'square' as const, sortOrder: 3 },
  { file: 'IMG_0341.JPG', alt: 'Outdoor sound healing retreat', aspectRatio: 'wide' as const, sortOrder: 4 },
  { file: 'IMG_5749.JPG', alt: 'Bracken with Tibetan bowls', aspectRatio: 'square' as const, sortOrder: 5 },
  { file: 'IMG_7831.JPG', alt: 'Sacred sound ceremony', aspectRatio: 'square' as const, sortOrder: 6 },
  { file: 'IMG_9659.JPG', alt: 'Evening sound bath gathering', aspectRatio: 'square' as const, sortOrder: 7 },
  { file: 'IMG_2318.JPG', alt: 'Nature connection retreat', aspectRatio: 'wide' as const, sortOrder: 8 },
  { file: 'IMG_8705.JPG', alt: 'Sauna sound ritual', aspectRatio: 'square' as const, sortOrder: 9 },
]

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding offerings...')
  for (const offering of offerings) {
    await payload.create({ collection: 'offerings', data: offering })
  }

  console.log('Seeding testimonials...')
  for (const testimonial of testimonials) {
    await payload.create({ collection: 'testimonials', data: testimonial })
  }

  console.log('Uploading gallery images...')
  const picsDir = path.resolve(process.cwd(), 'public/brand_assets/Pics')
  for (const img of galleryImages) {
    const filePath = path.join(picsDir, img.file)
    if (!fs.existsSync(filePath)) {
      console.warn(`  Skipping ${img.file} — file not found`)
      continue
    }

    const fileBuffer = fs.readFileSync(filePath)
    const media = await payload.create({
      collection: 'media',
      data: { alt: img.alt },
      file: {
        data: fileBuffer,
        mimetype: 'image/jpeg',
        name: img.file,
        size: fileBuffer.length,
      },
    })

    await payload.create({
      collection: 'gallery',
      data: {
        image: media.id,
        alt: img.alt,
        aspectRatio: img.aspectRatio,
        sortOrder: img.sortOrder,
      },
    })
    console.log(`  Uploaded ${img.file}`)
  }

  console.log('Updating site settings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Sacred Sound Sister',
      tagline: 'Rest is the medicine',
      contactEmail: 'Bracken.roots7@gmail.com',
      contactPhone: '+44 7596 086607',
      instagramHandles: [
        { handle: 'sacred.sound.sister', url: 'https://instagram.com/sacred.sound.sister' },
        { handle: 'brackenroots', url: 'https://instagram.com/brackenroots' },
      ],
      aboutHeading: 'Meet Bracken',
      footerText: '© 2026 Sacred Sound Sister. All rights reserved.',
    },
  })

  console.log('Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
