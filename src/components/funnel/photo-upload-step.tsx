"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { funnelStore, PhotoFile } from "@/lib/funnel-store";
import { Button } from "@/components/ui/button";
import { PHOTO_CATEGORIES } from "@/lib/constants";
import { Camera, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function PhotoUploadStep({ onNext, onBack }: Props) {
  const [photos, setPhotos] = useState<PhotoFile[]>(funnelStore.getState().photos);
  const [activeCategory, setActiveCategory] = useState<string>("front");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newPhotos = acceptedFiles.map((file) => ({
        category: activeCategory,
        file,
        preview: URL.createObjectURL(file),
      }));

      setPhotos((prev) => {
        // Replace existing photo for this category
        const filtered = prev.filter((p) => p.category !== activeCategory);
        return [...filtered, ...newPhotos];
      });
    },
    [activeCategory]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 1,
  });

  const removePhoto = (category: string) => {
    setPhotos((prev) => {
      const photo = prev.find((p) => p.category === category);
      if (photo) URL.revokeObjectURL(photo.preview);
      return prev.filter((p) => p.category !== category);
    });
  };

  const getPhotoForCategory = (cat: string) => photos.find((p) => p.category === cat);

  const requiredPhotos = PHOTO_CATEGORIES.filter((c) => c.required);
  const hasAllRequired = requiredPhotos.every((c) => getPhotoForCategory(c.id));

  const handleNext = () => {
    funnelStore.setPhotos(photos);
    onNext();
  };

  return (
    <div>
      <h2 className="funnel-title">Upload photos</h2>
      <p className="funnel-subtitle">Add clear photos of your vehicle</p>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {PHOTO_CATEGORIES.map((cat) => {
          const hasPhoto = !!getPhotoForCategory(cat.id);
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                activeCategory === cat.id
                  ? "border-primary bg-primary text-white"
                  : hasPhoto
                    ? "border-success bg-success/10 text-success"
                    : "border-gray-200 text-neutral-medium hover:border-gray-300"
              )}
            >
              {cat.label} {cat.required && !hasPhoto && "*"}
              {hasPhoto && " ✓"}
            </button>
          );
        })}
      </div>

      {/* Upload zone */}
      {getPhotoForCategory(activeCategory) ? (
        <div className="relative rounded-2xl overflow-hidden mb-4">
          <img
            src={getPhotoForCategory(activeCategory)!.preview}
            alt={activeCategory}
            className="w-full h-64 object-cover"
          />
          <button
            type="button"
            onClick={() => removePhoto(activeCategory)}
            className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all mb-4",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-gray-200 hover:border-primary/50"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            {isDragActive ? (
              <Upload className="w-10 h-10 text-primary" />
            ) : (
              <Camera className="w-10 h-10 text-neutral-medium" />
            )}
            <div>
              <p className="font-medium text-sm text-neutral-dark">
                {isDragActive ? "Drop your photo here" : "Drag & drop or click to upload"}
              </p>
              <p className="text-xs text-neutral-medium mt-1">
                Max 10MB per photo (JPG, PNG, WebP)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Photo grid preview */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {PHOTO_CATEGORIES.map((cat) => {
          const photo = getPhotoForCategory(cat.id);
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "relative aspect-square rounded-xl overflow-hidden border-2 transition-all",
                activeCategory === cat.id ? "border-primary" : "border-transparent",
                !photo && "bg-gray-50"
              )}
            >
              {photo ? (
                <img src={photo.preview} alt={cat.label} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                  <Camera className="w-4 h-4 text-neutral-medium" />
                  <span className="text-[10px] text-neutral-medium">{cat.label}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1" disabled={!hasAllRequired}>
          Next
        </Button>
      </div>
      {!hasAllRequired && (
        <p className="text-xs text-neutral-medium text-center mt-2">
          Please upload all required photos (front, rear, side, interior)
        </p>
      )}
    </div>
  );
}
