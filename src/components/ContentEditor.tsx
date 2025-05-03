import React, { useState, useEffect } from 'react';
import { Save, Image as ImageIcon, Type, Code, Loader2 } from 'lucide-react';
import { getContentBlock, updateContentBlock, createContentBlock, uploadImage } from '../config/supabase';
import ImageEditor from './ImageEditor';
import { useDropzone } from 'react-dropzone';

interface ContentEditorProps {
  contentKey: string;
  type: 'text' | 'image' | 'html';
  defaultContent?: string;
  label?: string;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  contentKey,
  type,
  defaultContent = '',
  label
}) => {
  const [content, setContent] = useState(defaultContent);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingImage, setEditingImage] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      const block = await getContentBlock(contentKey);
      if (block) {
        setContent(block.content);
      } else if (defaultContent) {
        await createContentBlock(contentKey, type, defaultContent);
      }
    };

    loadContent();
  }, [contentKey, type, defaultContent]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif']
    },
    multiple: false,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setIsSaving(true);
        
        try {
          const path = `${contentKey}-${Date.now()}`;
          const publicUrl = await uploadImage(file, path);
          
          if (publicUrl) {
            await updateContentBlock(contentKey, publicUrl, {
              originalName: file.name,
              size: file.size,
              type: file.type
            });
            setContent(publicUrl);
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        } finally {
          setIsSaving(false);
        }
      }
    }
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateContentBlock(contentKey, content);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderEditor = () => {
    switch (type) {
      case 'text':
        return (
          <div className="relative">
            {isEditing ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[100px] p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            ) : (
              <div
                onClick={() => setIsEditing(true)}
                className="w-full min-h-[100px] p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                {content}
              </div>
            )}
          </div>
        );

      case 'image':
        return (
          <div className="relative">
            {content ? (
              <div className="relative group">
                <img
                  src={content}
                  alt={label || 'Content image'}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => setEditingImage(content)}
                    className="bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100"
                  >
                    Edit Image
                  </button>
                </div>
              </div>
            ) : (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                  ${isDragActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'}`}
              >
                <input {...getInputProps()} />
                <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">
                  {isDragActive ? 'Drop the image here...' : 'Drag & drop an image here, or click to select'}
                </p>
              </div>
            )}
          </div>
        );

      case 'html':
        return (
          <div className="relative">
            {isEditing ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[200px] p-3 font-mono text-sm border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            ) : (
              <div
                onClick={() => setIsEditing(true)}
                className="w-full min-h-[200px] p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {label && (
        <div className="flex items-center gap-2">
          {type === 'text' && <Type className="w-4 h-4" />}
          {type === 'image' && <ImageIcon className="w-4 h-4" />}
          {type === 'html' && <Code className="w-4 h-4" />}
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
      )}

      {renderEditor()}

      {(isEditing || isSaving) && type !== 'image' && (
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      )}

      {editingImage && (
        <ImageEditor
          image={editingImage}
          onSave={async (editedImage) => {
            setIsSaving(true);
            try {
              // Convert base64 to blob and upload
              const response = await fetch(editedImage);
              const blob = await response.blob();
              const file = new File([blob], 'edited-image.jpg', { type: 'image/jpeg' });
              
              const path = `${contentKey}-${Date.now()}`;
              const publicUrl = await uploadImage(file, path);
              
              if (publicUrl) {
                await updateContentBlock(contentKey, publicUrl);
                setContent(publicUrl);
              }
            } catch (error) {
              console.error('Error saving edited image:', error);
            } finally {
              setIsSaving(false);
              setEditingImage(null);
            }
          }}
          onClose={() => setEditingImage(null)}
        />
      )}
    </div>
  );
};

export default ContentEditor;