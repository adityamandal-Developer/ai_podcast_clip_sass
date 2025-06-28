"use client";
import type { Clip } from "@prisma/client";
import { Download, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { getClipPlayUrl } from "~/actions/generation";
import { Button } from "./ui/button";

const ClipCard = ({ clip }: { clip: Clip }) => {
  const [playUrl, setPlayUrl] = useState<string | null>(null);
  const [loading, setLoding] = useState(true);

  useEffect(() => {
    async function fetchPlayUrl() {
      try {
        const { success, error, url } = await getClipPlayUrl(clip.id);
        if (success && url) {
          setPlayUrl(url);
        } else if (error) {
          toast.error(error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoding(false);
      }
    }

    void fetchPlayUrl();
  }, [clip.id]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = playUrl!;
    link.style.display = "none";
    document.body.append(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="mx-w-52 gap2 flex flex-col">
      <div className="">
        {loading ? (
          <LoaderCircle className="animate-spin" />
        ) : playUrl ? (
          <video
            src={playUrl}
            controls
            preload="metadata"
            className="h-full w-full rounded-[var(--radius)] object-cover"
          />
        ) : (
          <h1>Error</h1>
        )}
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <Button onClick={handleDownload}>
          Download <Download />
        </Button>
      </div>
    </div>
  );
};

type Props = {
  clips: Clip[];
};
const DisplayClips = ({ clips }: Props) => {
  if (clips.length === 0) {
    return (
      <h3 className="text-accent-foreground text-center">
        No clips yet or in processing
      </h3>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {clips.map((clip) => (
        <ClipCard clip={clip} key={clip.id} />
      ))}
    </div>
  );
};

export default DisplayClips;
