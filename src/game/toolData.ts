import type { ToolSpec } from './types';

export const STAGE_WIDTH = 5760;
export const STAGE_HEIGHT = 1080;
export const SCREEN_WIDTH = 1920; // 5760 / 3

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
        variants: [
          {
            id: 'bow_branch_dogwood',
            label: 'Dogwood Branch',
            rawAsset: 'bow_branch_dogwood_raw',
            shapedAsset: 'bow_branch_dogwood_shaped',
            finalAsset: 'bow_branch_dogwood_shaped',
          },
          {
            id: 'bow_branch_ash',
            label: 'Ash Branch',
            rawAsset: 'bow_branch_ash_raw',
            shapedAsset: 'bow_branch_ash_shaped',
            finalAsset: 'bow_branch_ash_shaped',
          },
        ],
        forageX: 600,
        forageY: 700,
        station: 1,
      },
      {
        id: 'bow_stone',
        label: 'Chipped Stone Point',
        category: 'stone',
        variants: [
          {
            id: 'bow_stone_chert',
            label: 'Chert Point',
            rawAsset: 'bow_stone_chert_raw',
            shapedAsset: 'bow_stone_chert_shaped',
            finalAsset: 'bow_stone_chert_shaped',
          },
          {
            id: 'bow_stone_flint',
            label: 'Flint Point',
            rawAsset: 'bow_stone_flint_raw',
            shapedAsset: 'bow_stone_flint_shaped',
            finalAsset: 'bow_stone_flint_shaped',
          },
        ],
        forageX: 2880,
        forageY: 560,
        station: 2,
      },
      {
        id: 'bow_feather',
        label: 'Turkey Feather + Sinew',
        category: 'cordage',
        variants: [
          {
            id: 'bow_feather_sinew',
            label: 'Sinew Twine',
            rawAsset: 'bow_feather_sinew',
            finalAsset: 'bow_feather_sinew',
          },
          {
            id: 'bow_feather_cord',
            label: 'Plant Cordage',
            rawAsset: 'bow_feather_cord',
            finalAsset: 'bow_feather_cord',
          },
        ],
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
        variants: [
          {
            id: 'adze_handle_maple',
            label: 'Maple Handle',
            rawAsset: 'adze_handle_maple_raw',
            shapedAsset: 'adze_handle_maple_shaped',
            finalAsset: 'adze_handle_maple_shaped',
          },
          {
            id: 'adze_handle_antler',
            label: 'Elk Antler Handle',
            rawAsset: 'adze_handle_antler_raw',
            shapedAsset: 'adze_handle_antler_shaped',
            finalAsset: 'adze_handle_antler_shaped',
          },
        ],
        forageX: 560,
        forageY: 720,
        station: 1,
      },
      {
        id: 'adze_stone',
        label: 'Ground Stone Bit',
        category: 'stone',
        variants: [
          {
            id: 'adze_stone_basalt',
            label: 'Basalt Bit',
            rawAsset: 'adze_stone_basalt_raw',
            shapedAsset: 'adze_stone_basalt_shaped',
            finalAsset: 'adze_stone_basalt_shaped',
          },
          {
            id: 'adze_stone_greenstone',
            label: 'Greenstone Bit',
            rawAsset: 'adze_stone_greenstone_raw',
            shapedAsset: 'adze_stone_greenstone_shaped',
            finalAsset: 'adze_stone_greenstone_shaped',
          },
        ],
        forageX: 2880,
        forageY: 600,
        station: 2,
      },
      {
        id: 'adze_lashing',
        label: 'Wet Rawhide Lashing',
        category: 'cordage',
        variants: [
          {
            id: 'adze_lashing_rawhide',
            label: 'Wet Rawhide',
            rawAsset: 'adze_lashing_rawhide',
            finalAsset: 'adze_lashing_rawhide',
          },
          {
            id: 'adze_lashing_spruce',
            label: 'Spruce Root',
            rawAsset: 'adze_lashing_spruce',
            finalAsset: 'adze_lashing_spruce',
          },
        ],
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
        variants: [
          {
            id: 'spear_pole_cedar',
            label: 'Cedar Pole',
            rawAsset: 'spear_pole_cedar_raw',
            shapedAsset: 'spear_pole_cedar_shaped',
            finalAsset: 'spear_pole_cedar_shaped',
          },
          {
            id: 'spear_pole_pine',
            label: 'Pine Pole',
            rawAsset: 'spear_pole_pine_raw',
            shapedAsset: 'spear_pole_pine_shaped',
            finalAsset: 'spear_pole_pine_shaped',
          },
        ],
        forageX: 580,
        forageY: 700,
        station: 1,
      },
      {
        id: 'spear_prong',
        label: 'Barbed Bone Prongs',
        category: 'stone',
        variants: [
          {
            id: 'spear_prong_bone',
            label: 'Bone Prongs',
            rawAsset: 'spear_prong_bone_raw',
            shapedAsset: 'spear_prong_bone_shaped',
            finalAsset: 'spear_prong_bone_shaped',
          },
          {
            id: 'spear_prong_antler',
            label: 'Antler Prongs',
            rawAsset: 'spear_prong_antler_raw',
            shapedAsset: 'spear_prong_antler_shaped',
            finalAsset: 'spear_prong_antler_shaped',
          },
        ],
        forageX: 2880,
        forageY: 560,
        station: 2,
      },
      {
        id: 'spear_cordage',
        label: 'Milkweed Cordage + Resin',
        category: 'cordage',
        variants: [
          {
            id: 'spear_cordage_milkweed',
            label: 'Milkweed Cordage',
            rawAsset: 'spear_cordage_milkweed',
            finalAsset: 'spear_cordage_milkweed',
          },
          {
            id: 'spear_cordage_nettle',
            label: 'Nettle Cordage',
            rawAsset: 'spear_cordage_nettle',
            finalAsset: 'spear_cordage_nettle',
          },
        ],
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
