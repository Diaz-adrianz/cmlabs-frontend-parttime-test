'use client';

import { PlayIcon } from 'lucide-react';
import { ComponentProps, useMemo, useState } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const YoutubeEmbed = ({
  src,
  ...props
}: { src: string } & Omit<ComponentProps<typeof LiteYouTubeEmbed>, 'id'>) => {
  const [playing, setPlaying] = useState(false);

  const id = useMemo(() => {
    try {
      const u = new URL(src);
      return u.searchParams.get('v');
    } catch {
      return '';
    }
  }, [src]);

  if (!id) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-sm">
      {!playing && (
        <PlayIcon className="pointer-events-none absolute top-1/2 left-1/2 z-10 size-16 -translate-x-1/2 -translate-y-1/2 fill-white text-white md:size-20" />
      )}
      <LiteYouTubeEmbed
        {...props}
        id={id}
        onIframeAdded={() => {
          setPlaying(true);
        }}
      />
    </div>
  );
};

export { YoutubeEmbed };
