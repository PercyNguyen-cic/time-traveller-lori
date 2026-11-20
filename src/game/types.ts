export type Phase = 'loading' | 'greeting' | 'select' | 'forage' | 'assemble' | 'reveal';

export type MaterialCategory = 'wood' | 'stone' | 'bone' | 'cordage';

export interface MaterialVariant {
  id: string;
  label: string;
  rawAsset: string;
  shapedAsset?: string;
  finalAsset: string;
  forageX?: number;
  forageY?: number;
}

export interface MaterialSpec {
  id: string;
  label: string;
  category: MaterialCategory;
  variants: [MaterialVariant, MaterialVariant];
  /** x position in stage coords (0-5760) where the forage target appears */
  forageX: number;
  /** y position in stage coords (0-1080) where the forage target appears */
  forageY: number;
  /** station 1 = raw/shaping, station 2 = head/tip attachment, station 3 = binding */
  station: 1 | 2 | 3;
}

export interface ToolSpec {
  id: string;
  name: string;
  shortName: string;
  originRegion: string;
  cardAsset: string;
  finalAsset: string;
  silhouetteAsset: string;
  materials: [MaterialSpec, MaterialSpec, MaterialSpec];
  originFact: string;
  summary: string;
}

/** A tool with specific variants chosen for each material. */
export interface ResolvedMaterial {
  id: string;
  label: string;
  variantLabel: string;
  category: MaterialCategory;
  rawAsset: string;
  shapedAsset?: string;
  finalAsset: string;
  forageX: number;
  forageY: number;
  station: 1 | 2 | 3;
}

export interface ResolvedTool {
  id: string;
  name: string;
  shortName: string;
  originRegion: string;
  cardAsset: string;
  finalAsset: string;
  silhouetteAsset: string;
  materials: [ResolvedMaterial, ResolvedMaterial, ResolvedMaterial];
  originFact: string;
  summary: string;
}

export type PhaseStep = 'shape' | 'attach' | 'bind' | 'done';
