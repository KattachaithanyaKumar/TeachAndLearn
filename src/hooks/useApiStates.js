import { useState, useCallback } from 'react';

export const useApiStates = (initialStates = {}) => {
  const [states, setStates] = useState(() => {
    const defaultState = { loading: false, error: null, data: null };
    const initStates = {};
    
    Object.keys(initialStates).forEach(key => {
      initStates[key] = { ...defaultState, ...initialStates[key] };
    });
    
    return initStates;
  });

  const setLoading = useCallback((key, loading) => {
    setStates(prev => ({
      ...prev,
      [key]: { ...prev[key], loading, error: loading ? null : prev[key].error }
    }));
  }, []);

  const setError = useCallback((key, error) => {
    setStates(prev => ({
      ...prev,
      [key]: { ...prev[key], error, loading: false }
    }));
  }, []);

  const setData = useCallback((key, data) => {
    setStates(prev => ({
      ...prev,
      [key]: { ...prev[key], data, loading: false, error: null }
    }));
  }, []);

  const resetState = useCallback((key) => {
    setStates(prev => ({
      ...prev,
      [key]: { loading: false, error: null, data: null }
    }));
  }, []);

  const isAnyLoading = useCallback(() => {
    return Object.values(states).some(state => state.loading);
  }, [states]);

  const hasAnyError = useCallback(() => {
    return Object.values(states).some(state => state.error);
  }, [states]);

  return {
    states,
    setLoading,
    setError,
    setData,
    resetState,
    isAnyLoading,
    hasAnyError
  };
};

export default useApiStates;
