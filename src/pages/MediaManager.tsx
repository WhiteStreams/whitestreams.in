import React, { useState } from 'react';
import MediaUploader from '../components/MediaUploader';
import ImageEditor from '../components/ImageEditor';
import MediaGallery from '../components/MediaGallery';
import { HardDrive, Shield, AlertTriangle } from 'lucide-react';

interface StorageStats {
  used: number;
  total: number;
  files: number;
}

const MediaManager: React.FC = () => {
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [storageStats] = useState<StorageStats>({
    used: 2.5, // GB
    total: 10, // GB
    files: 156
  });

  const handleUpload = async (files: File[]) => {
    // Implement secure file upload logic here
    console.log('Uploading files:', files);
  };

  const handleSaveEdit = (editedImage: string) => {
    // Implement save edited image logic here
    console.log('Saving edited image:', editedImage);
    setEditingImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-serif text-gray-900 mb-2">Media Manager</h1>
            <p className="text-gray-600">
              Securely upload, manage, and organize your multimedia content
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-50 p-3 rounded-full">
                  <HardDrive className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Storage Used</h3>
                  <p className="text-gray-600">{storageStats.used}GB of {storageStats.total}GB</p>
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${(storageStats.used / storageStats.total) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Security Status</h3>
                  <p className="text-gray-600">Protected & Encrypted</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-50 p-3 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Files</h3>
                  <p className="text-gray-600">{storageStats.files} items</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Upload Media</h2>
            <MediaUploader
              onUpload={handleUpload}
              maxSize={50 * 1024 * 1024} // 50MB
              allowedTypes={['image/*', 'video/*', 'audio/*']}
            />
          </div>

          {/* Gallery Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Media Library</h2>
            <MediaGallery
              items={[]} // Add your media items here
              onSelect={() => {}}
              onDelete={() => {}}
              onMove={() => {}}
            />
          </div>
        </div>
      </div>

      {/* Image Editor Modal */}
      {editingImage && (
        <ImageEditor
          image={editingImage}
          onSave={handleSaveEdit}
          onClose={() => setEditingImage(null)}
        />
      )}
    </div>
  );
};

export default MediaManager;