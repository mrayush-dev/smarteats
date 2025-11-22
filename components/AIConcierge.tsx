import React, { useState } from 'react';
import { getFoodRecommendations } from '../services/geminiService';
import { AISuggestion } from '../types';
import { Button } from './Button';
import { Sparkles, X, ChefHat, ArrowRight } from 'lucide-react';

interface AIConciergeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIConcierge: React.FC<AIConciergeProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const results = await getFoodRecommendations(query);
    setSuggestions(results);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Zwiggy Genie</h2>
              <p className="text-orange-50 text-sm">Your personal AI food consultant</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
          <div className="bg-white rounded-xl p-1 shadow-sm border border-gray-200 flex items-center mb-6">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="I'm feeling spicy, maybe some noodles..."
              className="flex-1 px-4 py-3 outline-none text-gray-700 placeholder-gray-400"
              autoFocus
            />
            <Button onClick={handleSearch} disabled={loading} className="rounded-lg m-1">
              {loading ? 'Thinking...' : 'Ask Genie'}
            </Button>
          </div>

          {suggestions.length === 0 && !loading && (
            <div className="text-center py-10 text-gray-500">
              <ChefHat className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">What are you in the mood for?</p>
              <p className="text-sm">Try "Low carb dinner" or "Comfort food for a rainy day"</p>
            </div>
          )}

          {loading && (
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                        <div className="h-3 bg-gray-100 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                    </div>
                ))}
            </div>
          )}

          <div className="space-y-4">
            {suggestions.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                            {item.dishName}
                            <span className="text-xs font-normal px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{item.cuisine}</span>
                        </h3>
                        <p className="text-gray-600 mt-1 text-sm leading-relaxed">{item.reason}</p>
                        <div className="mt-3 flex items-center gap-4 text-xs text-gray-500 font-medium">
                            <span>🔥 {item.estimatedCalories}</span>
                        </div>
                    </div>
                    <button className="p-2 text-orange-500 hover:bg-orange-50 rounded-full transition opacity-0 group-hover:opacity-100">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};