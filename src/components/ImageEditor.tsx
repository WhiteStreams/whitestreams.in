import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { RotateCw, Maximize, Save, X } from 'lucide-react';

interface ImageEditorProps {
  image: string;
  onSave: (editedImage: string) => void;
  onClose: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ image, onSave, onClose }) => {
  const cropperRef = useRef<any>(null);
  const [rotation, setRotation] = useState(0);

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
    if (cropperRef.current?.cropper) {
      cropperRef.current.cropper.rotate(90);
    }
  };

  const handleSave = () => {
    if (cropperRef.current?.cropper) {
      const canvas = cropperRef.current.cropper.getCroppedCanvas();
      const editedImage = canvas.toDataURL();
      onSave(editedImage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Edit Image</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative">
          <Cropper
            ref={cropperRef}
            src={image}
            style={{ height: 400, width: '100%' }}
            initialAspectRatio={16 / 9}
            guides={true}
            rotatable={true}
            zoomable={true}
            cropBoxResizable={true}
            cropBoxMovable={true}
            responsive={true}
            restore={true}
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="space-x-2">
            <button
              onClick={handleRotate}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <RotateCw className="w-4 h-4" />
              Rotate
            </button>
            <button
              onClick={() => cropperRef.current?.cropper.reset()}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Maximize className="w-4 h-4" />
              Reset
            </button>
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;