"use client";

import { useState } from "react";

interface ProfileAvatarProps {
  src?: string;
  name?: string;
  className: string;
  fallbackClassName: string;
  alt?: string;
}

export function ProfileAvatar({
  src,
  name,
  className,
  fallbackClassName,
  alt,
}: ProfileAvatarProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string>();
  const initial = (name || "U").charAt(0).toUpperCase();
  const imageUrl = src?.trim();

  if (!imageUrl || failedImageUrl === imageUrl) {
    return <div className={fallbackClassName}>{initial}</div>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageUrl}
      alt={alt || name || "Profile picture"}
      className={className}
      onError={() => setFailedImageUrl(imageUrl)}
    />
  );
}
