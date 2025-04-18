import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, FileVideo, FileAudio, AlertCircle } from 'lucide-react';
import imageCompression from 'browser-image-compression';

interface MediaUploaderProps {
  onUpload: (files: File[]) => void;
  maxSize?: number; // in bytes
  allowedTypes?: string[];
}

const MediaUploader: React.FC<MediaUploaderProps> = ({
  onUpload,
  maxSize = 10 * 1024 * 1024, // 10MB default
  allowedTypes = ['image/*', 'video/*', 'audio/*']
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const compressImage = async (file: File): Promise<File> => {
    if (!file.type.startsWith('image/')) return file;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };

    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error('Error compressing image:', error);
      return file;
    }
  };

  const validateFile = (file: File): boolean => {
    if (file.size > maxSize) {
      setError(`File ${file.name} is too large. Maximum size is ${maxSize / 1024 / 1024}MB`);
      return false;
    }

    const isValidType = allowedTypes.some(type => {
      const [category, ext] = type.split('/');
      return ext === '*' ? file.type.startsWith(category) : file.type === type;
    });

    if (!isValidType) {
      setError(`File ${file.name} has an unsupported format`);
      return false;
    }

    return true;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError('');
    const validFiles: File[] = [];

    for (const file of acceptedFiles) {
      if (validateFile(file)) {
        const processedFile = await compressImage(file);
        validFiles.push(processedFile);
      }
    }

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      onUpload(validFiles);
    }
  }, [maxSize, allowedTypes, onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
      'video/*': ['.mp4', '.webm', '.ogg'],
      'audio/*': ['.mp3', '.wav', '.ogg']
    },
    multiple: true
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="w-6 h-6" />;
    if (type.startsWith('video/')) return <FileVideo className="w-6 h-6" />;
    if (type.startsWith('audio/')) return <FileAudio className="w-6 h-6" />;
    return null;
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600">
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag & drop files here, or click to select files'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Supported formats: Images, Videos, Audio • Max size: {maxSize / 1024 / 1024}MB
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="relative bg-gray-50 rounded-lg p-4 flex items-center gap-3"
            >
              {getFileIcon(file.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
                {uploadProgress[file.name] !== undefined && (
                  <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${uploadProgress[file.name]}%` }}
                    />
                  </div>
                )}
              </div>
              <button
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaUploader;