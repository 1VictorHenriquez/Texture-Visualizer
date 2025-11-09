
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Midnight Bloom', imageUrl: 'https://picsum.photos/seed/mbloom/300/200', design: 'Floral', color: 'Blue', type: 'Vinyl', category: 'Wallpaper', texture: 'Embossed' },
  { id: 2, name: 'Urban Grid', imageUrl: 'https://picsum.photos/seed/ugrid/300/200', design: 'Geometric', color: 'Grey', type: 'Mural', category: 'Wallpaper', texture: 'Smooth' },
  { id: 3, name: 'Forest Whisper', imageUrl: 'https://picsum.photos/seed/fwhisper/300/200', design: 'Nature', color: 'Green', type: 'Fabric', category: 'Wallpaper', texture: 'Linen' },
  { id: 4, name: 'Crimson Silk', imageUrl: 'https://picsum.photos/seed/csilk/300/200', design: 'Solid', color: 'Red', type: 'Roller', category: 'Blinds', texture: 'Metallic' },
  { id: 5, name: 'Azure Damask', imageUrl: 'https://picsum.photos/seed/adamask/300/200', design: 'Damask', color: 'Blue', type: 'Drapery', category: 'Curtains', texture: 'Velvet' },
  { id: 6, name: 'Golden Lines', imageUrl: 'https://picsum.photos/seed/glines/300/200', design: 'Geometric', color: 'Gold', type: 'Vinyl', category: 'Wallpaper', texture: 'Metallic' },
  { id: 7, name: 'Emerald Geo', imageUrl: 'https://picsum.photos/seed/egeo/300/200', design: 'Geometric', color: 'Green', type: 'Mural', category: 'Wallpaper', texture: 'Smooth' },
  { id: 8, name: 'Arctic White', imageUrl: 'https://picsum.photos/seed/awhite/300/200', design: 'Solid', color: 'White', type: 'Roman', category: 'Blinds', texture: 'Linen' },
  { id: 9, name: 'Charcoal Weave', imageUrl: 'https://picsum.photos/seed/cweave/300/200', design: 'Textured', color: 'Grey', type: 'Drapery', category: 'Curtains', texture: 'Embossed' },
  { id: 10, name: 'Rose Petal', imageUrl: 'https://picsum.photos/seed/rpetal/300/200', design: 'Floral', color: 'Pink', type: 'Fabric', category: 'Wallpaper', texture: 'Smooth' },
];

export const FILTER_OPTIONS = {
  design: ['Floral', 'Geometric', 'Solid', 'Nature', 'Damask', 'Textured'],
  color: ['Blue', 'Grey', 'Green', 'Red', 'Gold', 'White', 'Pink'],
  type: ['Vinyl', 'Mural', 'Fabric', 'Roller', 'Drapery', 'Roman'],
  category: ['Wallpaper', 'Blinds', 'Curtains'],
  texture: ['Embossed', 'Smooth', 'Linen', 'Metallic', 'Velvet'],
};
