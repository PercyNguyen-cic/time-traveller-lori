import type { ToolSpec } from './types';

export const STAGE_WIDTH = 5760;
export const STAGE_HEIGHT = 1080;

export const TAPS_TO_SHAPE = 4;

export const TOOLS: ToolSpec[] = [
  {
    id: 'bow',
    name: 'Woodland Self-Bow & Arrow',
    shortName: 'Bow & Arrow',
    originRegion: 'Eastern Woodlands / Plains',
    cardAsset: 'bow_card',
    finalAsset: 'bow_final',
    silhouetteAsset: 'bow_silhouette',
    materials: [
      {
        id: 'bow_branch',
        label: 'Hardwood Branch',
        category: 'wood',
        rawAsset: 'bow_branch_raw',
        shapedAsset: 'bow_branch_shaped',
        finalAsset: 'bow_branch_shaped',
        forageX: 600,
        forageY: 700,
        station: 1,
      },
      {
        id: 'bow_stone',
        label: 'Chipped Stone Point',
        category: 'stone',
        rawAsset: 'bow_stone_raw',
        shapedAsset: 'bow_stone_shaped',
        finalAsset: 'bow_stone_shaped',
        forageX: 2880,
        forageY: 560,
        station: 2,
      },
      {
        id: 'bow_feather',
        label: 'Turkey Feather + Sinew',
        category: 'cordage',
        rawAsset: 'bow_feather',
        finalAsset: 'bow_feather',
        forageX: 5100,
        forageY: 680,
        station: 3,
      },
    ],
    originFact:
      'Straight-grained hardwoods and flaked stone created high projectile velocity for hunting small game and defense.',
    summary:
      'A bendy wooden bow paired with a stone-tipped arrow. Eastern Woodlands and Plains peoples crafted these for hunting and protection.',
  },
  {
    id: 'adze',
    name: 'Stone-Bit Woodworking Adze',
    shortName: 'Stone Adze',
    originRegion: 'Northwest Coast / Eastern Woodlands',
    cardAsset: 'adze_card',
    finalAsset: 'adze_final',
    silhouetteAsset: 'adze_silhouette',
    materials: [
      {
        id: 'adze_handle',
        label: 'L-Shaped Hardwood Handle',
        category: 'wood',
        rawAsset: 'adze_handle_raw',
        shapedAsset: 'adze_handle_shaped',
        finalAsset: 'adze_handle_shaped',
        forageX: 560,
        forageY: 720,
        station: 1,
      },
      {
        id: 'adze_stone',
        label: 'Ground Stone Bit',
        category: 'stone',
        rawAsset: 'adze_stone_raw',
        shapedAsset: 'adze_stone_shaped',
        finalAsset: 'adze_stone_shaped',
        forageX: 2880,
        forageY: 600,
        station: 2,
      },
      {
        id: 'adze_lashing',
        label: 'Wet Rawhide Lashing',
        category: 'cordage',
        rawAsset: 'adze_lashing',
        finalAsset: 'adze_lashing',
        forageX: 5080,
        forageY: 700,
        station: 3,
      },
    ],
    originFact:
      'Used for hollowing out dugout canoes, shaping heavy timber, and constructing plank houses.',
    summary:
      'A stone blade lashed to an L-shaped handle. Northwest Coast and Eastern Woodlands peoples used it to carve canoes and plank houses.',
  },
  {
    id: 'awl',
    name: 'Bone Awl & Basketry Needle',
    shortName: 'Bone Awl',
    originRegion: 'Subarctic / Eastern Woodlands',
    cardAsset: 'awl_card',
    finalAsset: 'awl_final',
    silhouetteAsset: 'awl_silhouette',
    materials: [
      {
        id: 'awl_bone',
        label: 'Long Bone Shaft',
        category: 'bone',
        rawAsset: 'awl_bone_raw',
        shapedAsset: 'awl_bone_shaped',
        finalAsset: 'awl_bone_shaped',
        forageX: 620,
        forageY: 680,
        station: 1,
      },
      {
        id: 'awl_tip',
        label: 'Sharpened Needle Tip',
        category: 'bone',
        rawAsset: 'awl_tip_raw',
        shapedAsset: 'awl_tip_shaped',
        finalAsset: 'awl_tip_shaped',
        forageX: 2880,
        forageY: 580,
        station: 2,
      },
      {
        id: 'awl_grip',
        label: 'Leather Grip Wrap',
        category: 'cordage',
        rawAsset: 'awl_grip',
        finalAsset: 'awl_grip',
        forageX: 5060,
        forageY: 660,
        station: 3,
      },
    ],
    originFact:
      'Essential for perforating hides to sew clothing and weaving tight, waterproof birchbark or root baskets.',
    summary:
      'A polished bone needle with a leather grip. Subarctic and Eastern Woodlands peoples used it to sew clothing and weave waterproof baskets.',
  },
  {
    id: 'spear',
    name: 'Leister Three-Pronged Fishing Spear',
    shortName: 'Fishing Spear',
    originRegion: 'Great Lakes / Pacific Northwest',
    cardAsset: 'spear_card',
    finalAsset: 'spear_final',
    silhouetteAsset: 'spear_silhouette',
    materials: [
      {
        id: 'spear_pole',
        label: 'Long Cedar Pole',
        category: 'wood',
        rawAsset: 'spear_pole_raw',
        shapedAsset: 'spear_pole_shaped',
        finalAsset: 'spear_pole_shaped',
        forageX: 580,
        forageY: 700,
        station: 1,
      },
      {
        id: 'spear_prong',
        label: 'Barbed Bone Prongs',
        category: 'bone',
        rawAsset: 'spear_prong_raw',
        shapedAsset: 'spear_prong_shaped',
        finalAsset: 'spear_prong_shaped',
        forageX: 2880,
        forageY: 560,
        station: 2,
      },
      {
        id: 'spear_cordage',
        label: 'Milkweed Cordage + Resin',
        category: 'cordage',
        rawAsset: 'spear_cordage',
        finalAsset: 'spear_cordage',
        forageX: 5120,
        forageY: 680,
        station: 3,
      },
    ],
    originFact:
      'Spring-loaded flexible wooden prongs trapped fish securely in shallow rivers during seasonal runs.',
    summary:
      'A three-pronged spear with barbed bone tips and cordage binding. Great Lakes and Pacific Northwest peoples used it to catch fish in shallow rivers.',
  },
];

export function getTool(id: string): ToolSpec {
  return TOOLS.find((t) => t.id === id) ?? TOOLS[0];
}
