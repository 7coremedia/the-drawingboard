import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Plus, FileUp, Activity, Image as ImageIcon, Video, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import MediaPreview from "./MediaPreview";
import DraggableMediaList from "./DraggableMediaList";
import { cn } from "@/lib/utils";

interface MediaFile {
  id: string;
  url: string;
  type: 'image' | 'video' | 'gif' | 'pdf';
  name: string;
  size?: number;
  file?: File;
}

interface EnhancedMediaUploadProps {
  coverImage?: MediaFile;
  mediaFiles?: MediaFile[];
  onCoverChange: (file: MediaFile | null) => void;
  onMediaFilesChange: (files: MediaFile[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
}

export default function EnhancedMediaUpload({
  coverImage,
  mediaFiles = [],
  onCoverChange,
  onMediaFilesChange,
  maxFiles = 20,
  acceptedTypes = ['image/*', 'video/*', '.pdf']
}: EnhancedMediaUploadProps) {
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  const getFileType = (file: File): 'image' | 'video' | 'gif' | 'pdf' => {
    if (file.type.startsWith('image/')) {
      return file.type === 'image/gif' ? 'gif' : 'image';
    }
    if (file.type.startsWith('video/')) return 'video';
    if (file.type === 'application/pdf') return 'pdf';
    return 'image'; // fallback
  };

  const uploadToSupabase = async (file: File, bucket: string = 'portfolio-assets'): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrl;
  };

  const onCoverDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    setUploadingCover(true);
    try {
      const file = acceptedFiles[0];
      const url = await uploadToSupabase(file);
      
      const mediaFile: MediaFile = {
        id: Math.random().toString(36).slice(2),
        url,
        type: getFileType(file),
        name: file.name,
        size: file.size,
        file
      };
      
      onCoverChange(mediaFile);
    } catch (error) {
      console.error('Cover upload failed:', error);
    } finally {
      setUploadingCover(false);
    }
  }, [onCoverChange]);

  const onMediaDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    setUploadingMedia(true);
    try {
      const uploadPromises = acceptedFiles.slice(0, maxFiles - mediaFiles.length).map(async (file) => {
        const url = await uploadToSupabase(file);
        
        return {
          id: Math.random().toString(36).slice(2),
          url,
          type: getFileType(file),
          name: file.name,
          size: file.size,
          file
        } as MediaFile;
      });

      const newFiles = await Promise.all(uploadPromises);
      onMediaFilesChange([...mediaFiles, ...newFiles]);
    } catch (error) {
      console.error('Media upload failed:', error);
    } finally {
      setUploadingMedia(false);
    }
  }, [mediaFiles, maxFiles, onMediaFilesChange]);

  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps, isDragActive: isCoverDragActive } = useDropzone({
    onDrop: onCoverDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1,
    multiple: false,
  });

  const { getRootProps: getMediaRootProps, getInputProps: getMediaInputProps, isDragActive: isMediaDragActive } = useDropzone({
    onDrop: onMediaDrop,
    accept: acceptedTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxFiles: maxFiles - mediaFiles.length,
    multiple: true,
  });

  const removeCover = () => {
    onCoverChange(null);
  };

  const removeMediaFile = (fileId: string) => {
    onMediaFilesChange(mediaFiles.filter(f => f.id !== fileId));
  };

  const reorderMediaFiles = (reorderedFiles: MediaFile[]) => {
    onMediaFilesChange(reorderedFiles);
  };

  return (
    <div className="space-y-6">
      {/* Cover Image Upload */}
      <Card className="bg-white border-black/[0.05] p-6 md:p-8 rounded-[2.5rem] shadow-sm space-y-6">
        <div className="space-y-1.5">
            <h3 className="text-base font-display font-black tracking-tighter uppercase flex items-center gap-2 text-[#0D0D0D]">
                <ImageIcon size={16} className="text-[#C94A2C]" />
                Primary Exhibit Mapping
            </h3>
            <p className="text-[8px] uppercase tracking-[0.4em] font-black text-black/40 font-bold">Operational_Registry_Core</p>
        </div>
        
        {coverImage ? (
          <div className="space-y-6 animate-in fade-in duration-500">
            <MediaPreview
              file={coverImage}
              size="cover"
              onRemove={removeCover}
              className="max-w-sm mx-auto rounded-[2rem] border-black/5 overflow-hidden shadow-lg"
            />
            <div className="flex justify-center">
              <Button
                onClick={() => document.getElementById('cover-input')?.click()}
                disabled={uploadingCover}
                className="bg-black text-white hover:bg-[#C94A2C] rounded-full px-6 h-10 text-[8px] font-black uppercase tracking-widest transition-all shadow-md"
              >
                {uploadingCover ? (
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Injecting...</span>
                    </div>
                ) : 'Purge & Replace'}
              </Button>
              <input
                id="cover-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (files.length > 0) onCoverDrop(files);
                }}
              />
            </div>
          </div>
        ) : (
          <div
            {...getCoverRootProps()}
            className={cn(
                "group relative border-2 border-dashed rounded-[2rem] p-12 text-center cursor-pointer transition-all duration-500",
                isCoverDragActive ? "border-[#C94A2C] bg-[#C94A2C]/5" : "border-black/5 bg-[#F5F0E8]/40 hover:bg-[#F5F0E8]",
                uploadingCover ? "opacity-50 pointer-events-none" : ""
            )}
          >
            <input {...getCoverInputProps()} />
            <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-white rounded-[1.25rem] border border-black/5 flex items-center justify-center mx-auto shadow-sm group-hover:bg-[#0D0D0D] transition-all group-hover:scale-105 duration-500">
                    <FileUp size={20} className="text-[#C94A2C] group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#0D0D0D] group-hover:text-[#C94A2C] transition-colors">
                      {uploadingCover ? 'Ingesting Data...' : 'Initialize Cover Protocol'}
                    </p>
                    <p className="text-[7px] font-bold text-black/60 uppercase tracking-widest leading-relaxed">
                      {isCoverDragActive ? 'Release bitstream to begin mapping' : 'Drop clinical source or click to browse'}
                    </p>
                </div>
                <div className="pt-3 flex items-center justify-center gap-6 border-t border-black/5 max-w-[150px] mx-auto opacity-40 group-hover:opacity-80 transition-opacity">
                    <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[7px] font-black text-[#0D0D0D]">16:9</span>
                        <span className="text-[5px] font-bold tracking-widest text-[#0D0D0D]/60 uppercase">Ratio</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[7px] font-black text-[#0D0D0D]">4K</span>
                        <span className="text-[5px] font-bold tracking-widest text-[#0D0D0D]/60 uppercase">Mapping</span>
                    </div>
                </div>
            </div>
          </div>
        )}
      </Card>

      {/* Media Files Upload */}
      <Card className="bg-white border-black/[0.05] p-6 md:p-8 rounded-[2.5rem] shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-black/5 pb-4">
            <div className="space-y-1.5">
                <h3 className="text-base font-display font-black tracking-tighter uppercase flex items-center gap-2 text-[#0D0D0D]">
                    <Activity size={16} className="text-[#C94A2C]" />
                    Media Ingestion
                </h3>
                <p className="text-[8px] uppercase tracking-[0.4em] font-black text-black/40 font-bold">Supplemental_Registry</p>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-black tracking-[0.2em]">{mediaFiles.length} / {maxFiles}</span>
                <span className="text-[6px] font-bold text-black/40 uppercase tracking-widest">Protocol Limiter</span>
            </div>
        </div>

        {/* Upload Area */}
        {mediaFiles.length < maxFiles && (
          <div
            {...getMediaRootProps()}
            className={cn(
                "group border-2 border-dashed rounded-[2rem] p-8 text-center cursor-pointer transition-all duration-500",
                isMediaDragActive ? "border-[#C94A2C] bg-[#C94A2C]/5" : "border-black/5 bg-[#F5F0E8]/40 hover:bg-[#F5F0E8]",
                uploadingMedia ? "opacity-50 pointer-events-none" : ""
            )}
          >
            <input {...getMediaInputProps()} />
            <div className="space-y-4">
                <div className="w-10 h-10 bg-white rounded-xl border border-black/5 flex items-center justify-center mx-auto shadow-sm group-hover:bg-[#C94A2C] transition-all">
                    <Plus size={18} className="text-[#0D0D0D]/40 group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0D0D0D] group-hover:text-[#C94A2C] transition-colors">
                      {uploadingMedia ? 'Processing Pipeline...' : 'Inject Supplemental Assets'}
                    </p>
                    <p className="text-[7px] font-bold text-black/60 uppercase tracking-[0.15em]">
                      {isMediaDragActive ? 'Awaiting bitstream release' : 'Images, Industrial Videos, clinical PDFs'}
                    </p>
                </div>
            </div>
          </div>
        )}

        {/* Draggable File List */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-3">
              <span className="text-[7px] font-black uppercase tracking-[0.4em] text-black/40 whitespace-nowrap">Registry Timeline</span>
              <div className="h-px w-full bg-black/5" />
              {mediaFiles.length > 0 && <span className="text-[6px] font-bold text-[#0D0D0D]/40 tracking-[0.2em]">DRAG_TO_SEQUENCE</span>}
          </div>
          
          <DraggableMediaList
            files={mediaFiles}
            onReorder={reorderMediaFiles}
            onRemove={removeMediaFile}
          />
        </div>
      </Card>
    </div>
  );
}
