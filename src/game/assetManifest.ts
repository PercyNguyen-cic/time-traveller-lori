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

  // ---- Loading screen ----
  loading_bg: { path: '/assets/backgrounds/loading_bg.png', label: 'Loading screen background' },

  // ---- Backgrounds ----
  bg_attract: { path: '/assets/backgrounds/bg_attract.png', label: 'Attract screen background' },
  bg_forest: { path: '/assets/backgrounds/bg_forest.png', label: 'Forest / riverbed landscape' },
  bg_conveyor: { path: '/assets/backgrounds/bg_conveyor.png', label: 'Conveyor belt workshop' },
  bg_museum: { path: '/assets/backgrounds/bg_museum.png', label: 'Museum display room' },
  bg_goodbye: { path: '/assets/backgrounds/bg_goodbye.png', label: 'Goodbye screen background' },

  // ---- Conveyor ----
  conveyor_strip: { path: '/assets/tools/conveyor_strip.png', label: 'Conveyor belt strip' },

  // ---- Bow & Arrow ----
  bow_card: { path: '/assets/tools/bow_card.png', label: 'Bow & Arrow card' },
  bow_branch_dogwood_raw: { path: '/assets/tools/bow_branch_dogwood_raw.png', label: 'Raw dogwood branch' },
  bow_branch_dogwood_shaped: { path: '/assets/tools/bow_branch_dogwood_shaped.png', label: 'Shaped dogwood shaft' },
  bow_branch_ash_raw: { path: '/assets/tools/bow_branch_ash_raw.png', label: 'Raw ash branch' },
  bow_branch_ash_shaped: { path: '/assets/tools/bow_branch_ash_shaped.png', label: 'Shaped ash shaft' },
  bow_stone_chert_raw: { path: '/assets/tools/bow_stone_chert_raw.png', label: 'Raw chert chunk' },
  bow_stone_chert_shaped: { path: '/assets/tools/bow_stone_chert_shaped.png', label: 'Chipped chert point' },
  bow_stone_flint_raw: { path: '/assets/tools/bow_stone_flint_raw.png', label: 'Raw flint chunk' },
  bow_stone_flint_shaped: { path: '/assets/tools/bow_stone_flint_shaped.png', label: 'Chipped flint point' },
  bow_feather_sinew: { path: '/assets/tools/bow_feather_sinew.png', label: 'Turkey feather + sinew' },
  bow_feather_cord: { path: '/assets/tools/bow_feather_cord.png', label: 'Turkey feather + plant cordage' },
  bow_final: { path: '/assets/tools/bow_final.png', label: 'Completed bow & arrow' },
  bow_silhouette: { path: '/assets/tools/bow_silhouette.png', label: 'Bow & arrow in use' },

  // ---- Adze ----
  adze_card: { path: '/assets/tools/adze_card.png', label: 'Adze card' },
  adze_handle_maple_raw: { path: '/assets/tools/adze_handle_maple_raw.png', label: 'Raw maple handle' },
  adze_handle_maple_shaped: { path: '/assets/tools/adze_handle_maple_shaped.png', label: 'Shaped maple handle' },
  adze_handle_antler_raw: { path: '/assets/tools/adze_handle_antler_raw.png', label: 'Raw elk antler handle' },
  adze_handle_antler_shaped: { path: '/assets/tools/adze_handle_antler_shaped.png', label: 'Shaped elk antler handle' },
  adze_stone_basalt_raw: { path: '/assets/tools/adze_stone_basalt_raw.png', label: 'Raw basalt chunk' },
  adze_stone_basalt_shaped: { path: '/assets/tools/adze_stone_basalt_shaped.png', label: 'Ground basalt bit' },
  adze_stone_greenstone_raw: { path: '/assets/tools/adze_stone_greenstone_raw.png', label: 'Raw greenstone chunk' },
  adze_stone_greenstone_shaped: { path: '/assets/tools/adze_stone_greenstone_shaped.png', label: 'Ground greenstone bit' },
  adze_lashing_rawhide: { path: '/assets/tools/adze_lashing_rawhide.png', label: 'Wet rawhide lashing' },
  adze_lashing_spruce: { path: '/assets/tools/adze_lashing_spruce.png', label: 'Spruce root lashing' },
  adze_final: { path: '/assets/tools/adze_final.png', label: 'Completed adze' },
  adze_silhouette: { path: '/assets/tools/adze_silhouette.png', label: 'Adze in use' },

  // ---- Fishing Spear ----
  spear_card: { path: '/assets/tools/spear_card.png', label: 'Fishing Spear card' },
  spear_pole_cedar_raw: { path: '/assets/tools/spear_pole_cedar_raw.png', label: 'Raw cedar pole' },
  spear_pole_cedar_shaped: { path: '/assets/tools/spear_pole_cedar_shaped.png', label: 'Shaped cedar shaft' },
  spear_pole_pine_raw: { path: '/assets/tools/spear_pole_pine_raw.png', label: 'Raw pine pole' },
  spear_pole_pine_shaped: { path: '/assets/tools/spear_pole_pine_shaped.png', label: 'Shaped pine shaft' },
  spear_prong_bone_raw: { path: '/assets/tools/spear_prong_bone_raw.png', label: 'Raw bone prongs' },
  spear_prong_bone_shaped: { path: '/assets/tools/spear_prong_bone_shaped.png', label: 'Carved bone prongs' },
  spear_prong_antler_raw: { path: '/assets/tools/spear_prong_antler_raw.png', label: 'Raw antler prongs' },
  spear_prong_antler_shaped: { path: '/assets/tools/spear_prong_antler_shaped.png', label: 'Carved antler prongs' },
  spear_cordage_milkweed: { path: '/assets/tools/spear_cordage_milkweed.png', label: 'Milkweed cordage + resin' },
  spear_cordage_nettle: { path: '/assets/tools/spear_cordage_nettle.png', label: 'Nettle cordage + resin' },
  spear_final: { path: '/assets/tools/spear_final.png', label: 'Completed fishing spear' },
  spear_silhouette: { path: '/assets/tools/spear_silhouette.png', label: 'Spear in use' },
};

export function assetLabel(key: string): string {
  return ASSET_MANIFEST[key]?.label ?? key;
}

export function assetPath(key: string): string {
  return ASSET_MANIFEST[key]?.path ?? '';
}
