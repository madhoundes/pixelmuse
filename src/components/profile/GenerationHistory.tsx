import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Generation } from '../../utils/profileMockData';
import DeleteConfirmationModal from '../ui/DeleteConfirmationModal';
import { cn } from '../../utils/cn';

interface GenerationHistoryProps {
  generations: Generation[];
}

const GenerationHistory: React.FC<GenerationHistoryProps> = ({ generations }) => {
  const [selectedGeneration, setSelectedGeneration] = useState<Generation | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = (generation: Generation) => {
    setSelectedGeneration(generation);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Here you would typically make an API call to delete the generation
    console.log('Deleting generation:', selectedGeneration?.id);
    setIsDeleteModalOpen(false);
    setSelectedGeneration(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getQualityType = (credits: number): 'Low' | 'Medium' | 'HD' => {
    if (credits <= 4) return 'Low';
    if (credits <= 8) return 'Medium';
    return 'HD';
  };

  const getQualityColor = (quality: 'Low' | 'Medium' | 'HD') => {
    switch (quality) {
      case 'Low':
        return 'text-gray-400';
      case 'Medium':
        return 'text-blue-400';
      case 'HD':
        return 'text-purple-400';
    }
  };

  return (
    <div className="bg-[#151823] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-100">Generation History</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-[#1C1F2E] rounded-lg transition-colors">
            <Icon icon="solar:sort-from-bottom-to-top-bold" className="w-5 h-5 text-gray-300" />
          </button>
          <button className="p-2 hover:bg-[#1C1F2E] rounded-lg transition-colors">
            <Icon icon="solar:filter-bold" className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>

      {generations.length === 0 ? (
        <div className="text-center py-12">
          <Icon icon="solar:gallery-wide-bold" className="w-16 h-16 mx-auto text-gray-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-300">No generations yet</h3>
          <p className="text-gray-400 mt-2">Start creating amazing thumbnails!</p>
          <button className="btn-primary mt-6">Create New Thumbnail</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {generations.map((generation) => (
            <div 
              key={generation.id} 
              className="bg-[#1C1F2E] rounded-xl p-4 flex flex-col group hover:bg-[#242838] transition-colors"
            >
              <div className="relative mb-3 aspect-video rounded-lg overflow-hidden bg-black/20">
                <img
                  src={generation.imageUrl}
                  alt={generation.prompt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors">
                    <Icon icon="solar:download-bold" className="w-5 h-5 text-gray-100" />
                  </button>
                  <button 
                    onClick={() => handleDelete(generation)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors"
                  >
                    <Icon icon="solar:trash-bin-trash-bold" className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1">
                <p className="text-sm text-gray-300 line-clamp-2 mb-2">
                  {generation.prompt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <span className="flex items-center">
                    <Icon icon="solar:calendar-bold" className="w-4 h-4 mr-1" />
                    {formatDate(generation.createdAt)}
                  </span>
                  <span className={cn(
                    "flex items-center ml-auto",
                    getQualityColor(getQualityType(generation.creditsUsed))
                  )}>
                    <Icon icon="solar:flash-bold" className="w-4 h-4 mr-1" />
                    {getQualityType(generation.creditsUsed)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedGeneration?.prompt || 'this generation'}
      />
    </div>
  );
};

export default GenerationHistory;