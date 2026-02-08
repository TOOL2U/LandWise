import { Package } from '@/types/booking';

export const PACKAGES: Package[] = [
  {
    id: 'snapshot',
    name: 'LAND SNAPSHOT',
    tagline: 'See your land clearly.',
    image: '/assets/package 1.png',
    standardPrice: 15000,
    earlyAccessPrice: 12000,
    features: [
      'Drone 2D map',
      '3D terrain model',
      'Photorealistic concept images',
      'Short cinematic video',
    ],
    popular: false,
  },
  {
    id: 'visibility',
    name: 'VISIBILITY REPORT',
    tagline: 'Unlock visibility potential.',
    image: '/assets/package 2.png',
    standardPrice: 35000,
    earlyAccessPrice: 30000,
    features: [
      'Everything in Land Snapshot',
      'AI-enhanced photorealistic renders',
      'Legal overview (outsourced)',
      'Full branded PDF report',
    ],
    popular: true,
  },
  {
    id: 'ready',
    name: 'LAND READY PACKAGE',
    tagline: 'From raw to ready.',
    image: '/assets/package 3.png',
    standardPrice: 90000,
    earlyAccessPrice: 75000,
    features: [
      'Everything in Visibility Report',
      'Land clearing',
      'Full land survey',
      'Development consultation',
    ],
    popular: false,
  },
];

export function getPackageById(id: string): Package | undefined {
  return PACKAGES.find(pkg => pkg.id === id);
}
