import { useState, useEffect } from 'react';
import { assetPath, assetLabel } from '@/game/assetManifest';
import type { MaterialCategory } from '@/game/types';

interface AssetImageProps {
  assetKey: string;
  className?: string;
  style?: React.CSSProperties;
  /** category overrides the placeholder color; auto-detected from asset key prefix if omitted */
  category?: MaterialCategory;
  /** show the filename label inside placeholder (default true) */
  showLabel?: boolean;
  onClick?: () => void;
}

const CATEGORY_COLORS: Record<MaterialCategory, { bg: string; border: string; text: string }> = {
  wood: { bg: '#8B5A2B', border: '#D2A679', text: '#FFF3E0' },
  stone: { bg: '#6B7280', border: '#D1D5DB', text: '#F9FAFB' },
  bone: { bg: '#D6CDB7', border: '#F5F0E1', text: '#3D3422' },
  cordage: { bg: '#A67C52', border: '#D4B896', text: '#FFF8EE' },
};

function guessCategory(key: string): MaterialCategory {
  const k = key.toLowerCase();
  if (k.includes('branch') || k.includes('handle') || k.includes('pole') || k.includes('shaft'))
    return 'wood';
  if (k.includes('stone') || k.includes('flint') || k.includes('basalt')) return 'stone';
  if (k.includes('bone') || k.includes('tip') || k.includes('prong') || k.includes('antler'))
    return 'bone';
  if (
    k.includes('feather') ||
    k.includes('lashing') ||
    k.includes('grip') ||
    k.includes('cordage') ||
    k.includes('sinew') ||
    k.includes('rawhide') ||
    k.includes('resin')
  )
    return 'cordage';
  return 'wood';
}

export default function AssetImage({
  assetKey,
  className = '',
  style,
  category,
  showLabel = true,
  onClick,
}: AssetImageProps) {
  const [errored, setErrored] = useState(false);
  const path = assetPath(assetKey);
  const cat = category ?? guessCategory(assetKey);
  const colors = CATEGORY_COLORS[cat];

  // Reset error state when the asset key changes
  useEffect(() => setErrored(false), [assetKey]);

  if (!path || errored) {
    const filename = path ? path.split('/').pop() : `${assetKey}.png`;
    return (
      <div
        className={`flex flex-col items-center justify-center text-center rounded-lg border-4 border-dashed ${className}`}
        style={{
          backgroundColor: colors.bg + 'CC',
          borderColor: colors.border,
          color: colors.text,
          ...style,
        }}
        onClick={onClick}
      >
        {showLabel && (
          <>
            <span className="font-bold text-sm leading-tight px-2">{assetLabel(assetKey)}</span>
            <span className="text-xs opacity-70 px-2 mt-1 break-all">{filename}</span>
          </>
        )}
      </div>
    );
  }

  return (
    <img
      src={path}
      alt={assetLabel(assetKey)}
      className={className}
      style={style}
      onClick={onClick}
      onError={() => setErrored(true)}
      draggable={false}
    />
  );
}
