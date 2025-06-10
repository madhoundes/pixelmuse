import { useState, useCallback } from 'react';
import { analyzeImage } from '../utils/imageAnalysis';

export const useImageAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const analyze = useCallback(async (imageFile) => {
    if (!imageFile) return;

    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeImage(imageFile);
      setAnalysisResult(result);
    } catch (err) {
      console.error('Image analysis failed:', err);
      setError(err.message || 'Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsAnalyzing(false);
    setAnalysisResult(null);
    setError(null);
  }, []);

  return {
    analyzeImage: analyze,
    isAnalyzing,
    analysisResult,
    error,
    reset
  };
};