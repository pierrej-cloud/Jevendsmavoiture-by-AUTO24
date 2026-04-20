"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { funnelStore, PhotoFile } from "@/lib/funnel-store";
import { Button } from "@/components/ui/button";
import { PHOTO_CATEGORIES } from "@/lib/constants";
import { Camera, X, Upload, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/language-context";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

interface AiResult {
  brand: string | null;
  model: string | null;
  color: string | null;
  estimatedYear: number | null;
  bodyType: string | null;
  visiblePlate: string | null;
  visibleDamage: string[];
}

const PHOTO_LABEL_KEYS = {
  front: "front", rear: "rear", side: "side",
  interior: "interior", dashboard: "dashboard", damage: "damage",
} as const;

async function fileToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(",")[1];
      const mimeType = dataUrl.split(":")[1].split(";")[0];
      resolve({ base64, mimeType });
    };
    reader.readAsDataURL(file);
  });
}

export function PhotoUploadStep({ onNext, onBack }: Props) {
  const { t, locale } = useLanguage();
  const [photos, setPhotos] = useState<PhotoFile[]>(funnelStore.getState().photos);
  const [activeCategory, setActiveCategory] = useState<string>("front");
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<AiResult | null>(null);
  const [aiDismissed, setAiDismissed] = useState(false);
  const [aiAnalyzed, setAiAnalyzed] = useState(false);

  const getPhotoLabel = (catId: string) => {
    const key = PHOTO_LABEL_KEYS[catId as keyof typeof PHOTO_LABEL_KEYS];
    return key ? t.photos[key] : catId;
  };

  const analyzePhoto = async (file: File) => {
    if (aiAnalyzed) return;
    setAiAnalyzing(true);
    try {
      const { base64, mimeType } = await fileToBase64(file);
      const res = await fetch("/api/ai/analyze-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mimeType, locale }),
      });
      const data = await res.json();
      if (data && (data.brand || data.model)) {
        setAiResult(data);
      }
    } catch {
      // Silent fail
    }
    setAiAnalyzing(false);
    setAiAnalyzed(true);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newPhotos = acceptedFiles.map((file) => ({
        category: activeCategory,
        file,
        preview: URL.createObjectURL(file),
      }));

      setPhotos((prev) => {
        const filtered = prev.filter((p) => p.category !== activeCategory);
        return [...filtered, ...newPhotos];
      });

      // Trigger AI analysis on first external-facing photo
      if (!aiAnalyzed && acceptedFiles.length > 0 && ["front", "rear", "side"].includes(activeCategory)) {
        analyzePhoto(acceptedFiles[0]);
      }
    },
    [activeCategory, aiAnalyzed]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    maxSize: 10 * 1024 * 1024,
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

  const handlePrefill = () => {
    if (!aiResult) return;
    const existing = funnelStore.getState().vehicleInfo;
    const prefill: Record<string, unknown> = { ...existing };
    if (aiResult.brand) prefill.brand = aiResult.brand;
    if (aiResult.model) prefill.model = aiResult.model;
    if (aiResult.color) prefill.color = aiResult.color;
    if (aiResult.estimatedYear) prefill.year = aiResult.estimatedYear;
    funnelStore.setVehicleInfo(prefill as Parameters<typeof funnelStore.setVehicleInfo>[0]);
    setAiDismissed(true);
  };

  const handleNext = () => {
    funnelStore.setPhotos(photos);
    onNext();
  };

  const hasPhotos = photos.length > 0;
  const showAiBanner = aiResult && !aiDismissed;
  const aiSummary = [aiResult?.brand, aiResult?.model, aiResult?.color].filter(Boolean).join(" ");

  return (
    <div>
      <h2 className="funnel-title">{t.photos.title}</h2>
      <p className="funnel-subtitle">{t.photos.subtitle}</p>

      {/* AI analyzing indicator */}
      {aiAnalyzing && (
        <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-xl p-3 mb-4">
          <Loader2 className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
          <p className="text-xs text-primary font-medium">{t.photos.aiAnalyzing}</p>
        </div>
      )}

      {/* AI detection banner */}
      {showAiBanner && (
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-neutral-dark">
                {t.photos.aiDetected} <span className="text-primary font-semibold">{aiSummary}</span>
              </p>
              <p className="text-xs text-neutral-medium mt-0.5">{t.photos.aiPrefill}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handlePrefill} className="text-xs">
              {t.photos.aiYes}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setAiDismissed(true)} className="text-xs">
              {t.photos.aiNo}
            </Button>
          </div>
        </div>
      )}

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
              {getPhotoLabel(cat.id)}
              {hasPhoto && " ✓"}
            </button>
          );
        })}
      </div>

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
                {isDragActive ? t.common.dropPhotoHere : t.photos.dragDrop}
              </p>
              <p className="text-xs text-neutral-medium mt-1">{t.photos.maxSize}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 mb-4">
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
                <img src={photo.preview} alt={getPhotoLabel(cat.id)} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                  <Camera className="w-4 h-4 text-neutral-medium" />
                  <span className="text-[10px] text-neutral-medium">{getPhotoLabel(cat.id)}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 text-center mb-6">{t.photos.encouragement}</p>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          {t.common.back}
        </Button>
        <Button onClick={handleNext} className="flex-1">
          {hasPhotos ? t.common.next : t.photos.continueWithout}
        </Button>
      </div>
    </div>
  );
}
