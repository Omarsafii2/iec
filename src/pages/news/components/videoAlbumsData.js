/** أرشيف مجموعات الفيديو */

export const VIDEO_ALBUMS = [
  {
    id: 'highlights-2024',
    title: 'تغطيات وملخصات 2024',
    date: '2024',
    coverImage:
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800',
    videoCount: 3,
    videos: [
      {
        id: 'club-summary-2024',
        title: 'ملخص نشاطات النادي 2024',
        date: '30 كانون الأول 2024',
        duration: '05:30',
        thumbnail:
          'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800',
        embedUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
      },
      {
        id: 'president-iftar-speech',
        title: 'كلمة رئيس النادي في حفل الإفطار',
        date: '15 رمضان 2024',
        duration: '12:45',
        thumbnail:
          'https://images.unsplash.com/photo-1475721027767-p753c96d996c?auto=format&fit=crop&q=80&w=800',
        embedUrl: 'https://www.youtube.com/embed/M7lc1UVf-VE',
      },
      {
        id: 'new-facilities-tour',
        title: 'جولة في مرافق النادي الجديدة',
        date: '01 شباط 2024',
        duration: '03:15',
        thumbnail:
          'https://images.unsplash.com/photo-1586882829491-b81178aa622e?auto=format&fit=crop&q=80&w=800',
        embedUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U',
      },
    ],
  },
  {
    id: 'sports-2025',
    title: 'البطولات والمنافسات الرياضية',
    date: '2025',
    coverImage:
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800',
    videoCount: 2,
    videos: [
      {
        id: 'football-final',
        title: 'أهداف نهائي بطولة الشتاء',
        date: '08 آذار 2025',
        duration: '08:02',
        thumbnail:
          'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800',
        embedUrl: 'https://www.youtube.com/embed/LXb3EKWsInQ',
      },
      {
        id: 'youth-academy',
        title: 'تقرير أكاديمية الناشئين',
        date: '22 شباط 2025',
        duration: '06:40',
        thumbnail:
          'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=800',
        embedUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
      },
    ],
  },
  {
    id: 'events-gala',
    title: 'الاحتفالات والمناسبات',
    date: '2025',
    coverImage:
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
    videoCount: 2,
    videos: [
      {
        id: 'annual-gala',
        title: 'حفل التكريم السنوي',
        date: '10 نيسان 2025',
        duration: '18:00',
        thumbnail:
          'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
        embedUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
      },
      {
        id: 'charity-night',
        title: 'أمسية خيرية — لقطات مختارة',
        date: '05 آذار 2025',
        duration: '04:55',
        thumbnail:
          'https://images.unsplash.com/photo-1469571486292-0baa58bef2c3?auto=format&fit=crop&q=80&w=800',
        embedUrl: 'https://www.youtube.com/embed/8jPQjjsBbIc',
      },
    ],
  },
];

export function getVideoAlbumById(id) {
  return VIDEO_ALBUMS.find((a) => a.id === id);
}
