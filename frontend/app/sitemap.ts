import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://kinur.my.id', lastModified: new Date(), priority: 1 },
    {
      url: 'https://kinur.my.id/about',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://kinur.my.id/projects',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://kinur.my.id/blog',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://kinur.my.id/contact',
      lastModified: new Date(),
      priority: 0.5,
    },
  ];
}
