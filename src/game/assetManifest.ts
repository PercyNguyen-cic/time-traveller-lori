export interface AssetEntry {
  path: string;
  label: string;
}

/**
 * Centralized asset manifest.
 * Drop your transparent PNGs into /assets/<subfolder>/<filename> and they will
 * automatically replace the color-coded placeholder boxes rendered by <AssetImage>.
 */
export const ASSET_MANIFEST: Record<string, AssetEntry> = {
  // ---- Lori mascot ----
  lori_wave: { path: '/assets/characters/lori_wave.png', label: 'Lori waving' },
  lori_talk: { path: '/assets/characters/lori_talk.png', label: 'Lori talking' },
  lori_celebrate: { path: '/assets/characters/lori_celebrate.png', label: 'Lori celebrating' },
  lori_drop: { path: '/assets/characters/lori_drop.png', label: 'Lori dropping in' },

  // ---- Backgrounds ----
  bg_attract: { path: '/assets/backgrounds/bg_attract.png', label: 'Attract screen background' },
  bg_forest: { path: '/assets/backgrounds/bg_forest.png', label: 'Forest / riverbed landscape' },
  bg_conveyor: { path: '/assets/backgrounds/bg_conveyor.png', label: 'Conveyor belt workshop' },
  bg_museum: { path: '/assets/backgrounds/bg_museum.png', label: 'Museum display room' },
  bg_goodbye: { path: '/assets/backgrounds/bg_goodbye.png', label: 'Goodbye screen background' },

  // ---- Bow & Arrow ----
  bow_card: { path: '/assets/tools/bow_card.png', label: 'Bow & Arrow card' },
  bow_branch_raw: { path: '/assets/tools/bow_branch_raw.png', label: 'Raw hardwood branch' },
  bow_branch_shaped: { path: '/assets/tools/bow_branch_shaped.png', label: 'Shaped bow shaft' },
  bow_stone_raw: { path: '/assets/tools/bow_stone_raw.png', label: 'Raw flint chunk' },
  bow_stone_shaped: { path: '/assets/tools/bow_stone_shaped.png', label: 'Chipped stone point' },
  bow_feather: { path: '/assets/tools/bow_feather.png', label: 'Turkey feather + sinew' },
  bow_final: { path: '/assets/tools/bow_final.png', label: 'Completed bow & arrow' },
  bow_silhouette: { path: '/assets/tools/bow_silhouette.png', label: 'Bow & arrow in use' },

  // ---- Adze ----
  adze_card: { path: '/assets/tools/adze_card.png', label: 'Adze card' },
  adze_handle_raw: { path: '/assets/tools/adze_handle_raw.png', label: 'Raw L-shaped handle' },
  adze_handle_shaped: { path: '/assets/tools/adze_handle_shaped.png', label: 'Shaped adze handle' },
  adze_stone_raw: { path: '/assets/tools/adze_stone_raw.png', label: 'Raw basalt chunk' },
  adze_stone_shaped: { path: '/assets/tools/adze_stone_shaped.png', label: 'Ground stone bit' },
  adze_lashing: { path: '/assets/tools/adze_lashing.png', label: 'Rawhide / spruce root lashing' },
  adze_final: { path: '/assets/tools/adze_final.png', label: 'Completed adze' },
  adze_silhouette: { path: '/assets/tools/adze_silhouette.png', label: 'Adze in use' },

  // ---- Bone Awl ----
  awl_card: { path: '/assets/tools/awl_card.png', label: 'Bone Awl card' },
  awl_bone_raw: { path: '/assets/tools/awl_bone_raw.png', label: 'Raw long bone shaft' },
  awl_bone_shaped: { path: '/assets/tools/awl_bone_shaped.png', label: 'Polished bone needle' },
  awl_tip_raw: { path: '/assets/tools/awl_tip_raw.png', label: 'Raw bone tip piece' },
  awl_tip_shaped: { path: '/assets/tools/awl_tip_shaped.png', label: 'Sharpened needle tip' },
  awl_grip: { path: '/assets/tools/awl_grip.png', label: 'Leather / sinew grip wrap' },
  awl_final: { path: '/assets/tools/awl_final.png', label: 'Completed bone awl' },
  awl_silhouette: { path: '/assets/tools/awl_silhouette.png', label: 'Awl in use' },

  // ---- Fishing Spear ----
  spear_card: { path: '/assets/tools/spear_card.png', label: 'Fishing Spear card' },
  spear_pole_raw: { path: '/assets/tools/spear_pole_raw.png', label: 'Raw cedar pole' },
  spear_pole_shaped: { path: '/assets/tools/spear_pole_shaped.png', label: 'Shaped spear shaft' },
  spear_prong_raw: { path: '/assets/tools/spear_prong_raw.png', label: 'Raw bone/antler prongs' },
  spear_prong_shaped: { path: '/assets/tools/spear_prong_shaped.png', label: 'Carved barbed prongs' },
  spear_cordage: { path: '/assets/tools/spear_cordage.png', label: 'Milkweed cordage + resin' },
  spear_final: { path: '/assets/tools/spear_final.png', label: 'Completed fishing spear' },
  spear_silhouette: { path: '/assets/tools/spear_silhouette.png', label: 'Spear in use' },
};

export function assetLabel(key: string): string {
  return ASSET_MANIFEST[key]?.label ?? key;
}

export function assetPath(key: string): string {
  return ASSET_MANIFEST[key]?.path ?? '';
}
