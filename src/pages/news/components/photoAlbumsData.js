/** أرشيف صور الألبومات */

export const PHOTO_ALBUMS = [
  {
    id: 'graduation-2025',
    title: 'حفل التخريج السنوي 2025',
    date: '15 حزيران 2025',
    coverImage:
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800',
    photoCount: 45,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800',
        alt: 'حفل التخريج السنوي 2025 1',
      },
      {
        src: 'https://images.unsplash.com/photo-1738949538943-e54722a44ffc?auto=format&fit=crop&q=80&w=1080',
        alt: 'حفل التخريج السنوي 2025 2',
      },
      {
        src: 'https://images.unsplash.com/photo-1627556704290-2b1f5853bf78?auto=format&fit=crop&q=80&w=800',
        alt: 'حفل التخريج السنوي 2025 3',
      },
      {
        src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800',
        alt: 'حفل التخريج السنوي 2025 4',
      },
      {
        src: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=800',
        alt: 'حفل التخريج السنوي 2025 5',
      },
      {
        src: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&q=80&w=800',
        alt: 'حفل التخريج السنوي 2025 6',
      },
    ],
  },
  {
    id: 'charity-bazaar-2025',
    title: 'البازار الخيري السنوي',
    date: '10 نيسان 2025',
    coverImage:
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=800',
    photoCount: 32,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=800',
        alt: 'البازار الخيري السنوي 1',
      },
      {
        src: 'https://images.unsplash.com/photo-1469571486292-0baa58bef2c3?auto=format&fit=crop&q=80&w=800',
        alt: 'البازار الخيري السنوي 2',
      },
      {
        src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800',
        alt: 'البازار الخيري السنوي 3',
      },
    ],
  },
  {
    id: 'ramadan-football-2025',
    title: 'بطولة كرة القدم الرمضانية',
    date: '01 آذار 2025',
    coverImage:
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800',
    photoCount: 28,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800',
        alt: 'بطولة كرة القدم الرمضانية 1',
      },
      {
        src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=800',
        alt: 'بطولة كرة القدم الرمضانية 2',
      },
      {
        src: 'https://images.unsplash.com/photo-1529900741953-cbf0e3d926e5?auto=format&fit=crop&q=80&w=800',
        alt: 'بطولة كرة القدم الرمضانية 3',
      },
    ],
  },
  {
    id: 'general-assembly-2025',
    title: 'لقاء الهيئة العامة',
    date: '20 كانون الثاني 2025',
    coverImage:
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
    photoCount: 15,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
        alt: 'لقاء الهيئة العامة 1',
      },
      {
        src: 'https://images.unsplash.com/photo-1521737711867-e3b75dffb37e?auto=format&fit=crop&q=80&w=800',
        alt: 'لقاء الهيئة العامة 2',
      },
    ],
  },
];

export function getPhotoAlbumById(id) {
  return PHOTO_ALBUMS.find((a) => a.id === id);
}
