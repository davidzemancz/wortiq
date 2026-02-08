import { useState, useCallback } from 'react';
import { analyzeProject } from '../utils/api';

export default function useAIAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const analyze = useCallback(async (projectData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeProject(projectData);
      setResult(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setResult(null);
  }, []);

  return { analyze, isLoading, error, result, reset };
}
