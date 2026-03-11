export const categoryData = {
  'Wedding': {
    title: 'Wedding',
    description: 'Capturing your special day with elegance and emotion.',
    coverImage: '/images/wedding-engagement/coverimage2.png'
  },
  'Pre-Wedding': {
    title: 'Pre-Wedding',
    description: 'Romantic and candid moments before the big day.',
    coverImage: '/images/coverimage.png'
  },
  'Events': {
    title: 'Events',
    description: 'Professional coverage for your corporate and private events.',
    coverImage: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  'Portraits': {
    title: 'Portraits',
    description: 'Timeless portraits that reflect your unique personality.',
    coverImage: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  'Fashion': {
    title: 'Fashion',
    description: 'High-end fashion and editorial photography.',
    coverImage: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  'Product': {
    title: 'Product',
    description: 'Clean and compelling product photography for your brand.',
    coverImage: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  'Birthday': {
    title: 'Birthday',
    description: 'Celebrating milestones with fun and vibrant photography.',
    coverImage: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
};

export const categories = ['All', ...Object.keys(categoryData)];

export const portfolioItems = [
  {
    id: '1',
    title: 'Romantic Wedding Ceremony',
    category: 'Wedding',
    image: '/images/wedding-engagement/coverimage2.png',
    description: 'Beautiful beach wedding ceremony at sunset',
    videoUrl: 'https://res.cloudinary.com/dhjfc1zsi/video/upload/v1773079043/ChaitanyaMounika_wedding_Beach_song-_Jhansi_studio-Makkuva_kt8sbp.webm',
  },
  {
    id: '2',
    title: 'Pre-Wedding Outdoor',
    category: 'Pre-Wedding',
    image: '/images/coverimage.png',
    description: 'Romantic pre-wedding shoot in nature',
    videoUrl: 'https://res.cloudinary.com/dhjfc1zsi/video/upload/v1773079515/Gowtham_Akhila_pre-wedding_song_tjwdi9.mp4',
  },
  {
    id: '3',
    title: 'Corporate Event',
    category: 'Events',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Professional corporate event coverage',
  },
  {
    id: '4',
    title: 'Fashion Portrait',
    category: 'Fashion',
    image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'High-fashion editorial portrait',
  },

  {
    id: '6',
    title: 'Professional Portrait',
    category: 'Portraits',
    image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Professional business portrait',
  },
  {
    id: '7',
    title: 'Product Photography',
    category: 'Product',
    image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Commercial product photography',
  },
  {
    id: '8',
    title: 'Engagement Shoot',
    category: 'Pre-Wedding',
    album: 'Wedding Engagement',
    image: '/images/wedding-engagement/jhansiphotography1125_80676238.jpg',
    description: 'Engagement Rings',
  },
  {
    id: '14',
    title: 'Engagement Session',
    category: 'Pre-Wedding',
    album: 'Wedding Engagement',
    image: '/images/wedding-engagement/jhansiphotography1125_80676300.jpg',
    description: 'Engagement ring photography',
  },
  {
    id: '19',
    title: 'Engagement portrait',
    category: 'Pre-Wedding',
    album: 'Wedding Engagement',
    image: '/images/wedding-engagement/jhansiphotography1125_80676313.jpg',
    description: 'Engagement ring with flowers',
  },
  {
    id: '15',
    title: 'Joining New Hearts',
    category: 'Wedding',
    album: 'Wedding Engagement',
    image: '/images/wedding-engagement/jhansiphotography1125_81762227.jpg',
    description: 'Beautiful wedding moment - Joining New Hearts',
  },
  {
    id: '16',
    title: 'Wedding Reception',
    category: 'Wedding',
    album: 'Wedding Engagement',
    image: '/images/wedding-engagement/jhansiphotography1125_81762253.jpg',
    description: "Romantic wedding reception - You're mine",
  },
  {
    id: '17',
    title: 'Traditional Bride',
    category: 'Wedding',
    album: 'Wedding Engagement',
    image: '/images/wedding-engagement/jhansiphotography1125_81762272.jpg',
    description: 'Stunning traditional bride portrait',
  },
  {
    id: '18',
    title: 'Wedding Ceremony',
    category: 'Wedding',
    album: 'Wedding Engagement',
    image: '/images/wedding-engagement/jhansiphotography1125_81762287.jpg',
    description: 'Elegant wedding ceremony coverage',
  },
  {
    id: '20',
    title: 'Wedding Portrait',
    category: 'Wedding',
    album: 'Wedding Engagement',
    image: '/images/wedding-engagement/jhansiphotography1125_81653428.jpg',
    description: 'Beautiful wedding couple portrait',
  },
  {
    id: '21',
    title: 'Wedding Moment',
    category: 'Wedding',
    album: 'Wedding Engagement',
    image: '/images/wedding-engagement/jhansiphotography1125_81653469.jpg',
    description: 'Candid wedding moment',
  },
  {
    id: '22',
    title: 'Bridal Portrait',
    category: 'Wedding',
    album: 'Wedding Engagement',
    image: '/images/wedding-engagement/jhansiphotography1125_81653484.jpg',
    description: 'Stunning bridal shot',
  },
  {
    id: '23',
    title: 'Wedding Celebration',
    category: 'Wedding',
    album: 'Wedding Engagement',
    image: '/images/wedding-engagement/jhansiphotography1125_81653499.jpg',
    description: 'Joyful wedding celebration',
  },

  {
    id: '10',
    title: 'Fashion Show',
    category: 'Fashion',
    image: 'https://images.pexels.com/photos/1926620/pexels-photo-1926620.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Runway fashion photography',
  },
  {
    id: '11',
    title: 'Family Portrait',
    category: 'Portraits',
    image: 'https://images.pexels.com/photos/2253879/pexels-photo-2253879.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Candid family moments',
  },
  {
    id: '12',
    title: 'Birthday Party',
    category: 'Birthday',
    image: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Birthday celebration coverage',
    videoUrl: '/videos/Ujwal 1st Birthday songJhansi fashion studio - makkuva-baby boy birthday shoot90.webm'
  },
];
