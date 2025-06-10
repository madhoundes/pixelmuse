import { useState, useCallback } from 'react';
import { performFaceSwap as performFaceSwapAPI, validateFaceSwapImages } from '../utils/faceSwapEngine';

export const useFaceSwap = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const performFaceSwap = useCallback(async (originalImage, newFaceImage, options = {}) => {
    // Validate inputs
    const validation = validateFaceSwapImages(originalImage, newFaceImage);
    if (!validation.isValid) {
      setError(validation.errors.join(', '));
      return null;
    }

    setIsProcessing(true);
    setError(null);
    setResult(null);
    setProgress(0);

    try {
      const swapOptions = {
        ...options,
        onProgress: setProgress
      };

      const swapResult = await performFaceSwapAPI(originalImage, newFaceImage, swapOptions);
      setResult(swapResult);
      return swapResult;
    } catch (err) {
      console.error('Face swap failed:', err);
      
      // Handle specific error types
      if (err.message.includes('No face detected')) {
        setError('No face detected in the uploaded image. Please use a clear photo with a visible face.');
      } else if (err.message.includes('Multiple faces')) {
        setError('Multiple faces detected. Please use an image with a single face.');
      } else if (err.message.includes('Low quality')) {
        setError('Image quality is too low. Please use a higher resolution image.');
      } else {
        setError('Face swap failed. Please try again with different images.');
      }
      
      return null;
    } finally {
      setIsProcessing(false);
      setProgress(100);
    }
  }, []);

  const reset = useCallback(() => {
    setIsProcessing(false);
    setResult(null);
    setError(null);
    setProgress(0);
  }, []);

  return {
    performFaceSwap,
    isProcessing,
    result,
    error,
    progress,
    reset
  };
};