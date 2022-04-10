import storage from 'core/storage';
import { useState } from 'react';

const storageKey = 'current-model';

const useCurrentModel = () => {
  const [currentModel, setCurrentModel] = useState(() => storage.getItem(storageKey));

  const setModel = (model) => {
    setCurrentModel(model);
    storage.setItem(storageKey, model);
  };

  const clearCurrentModel = () => {
    setCurrentModel(null);
    storage.removeItem(storageKey);
  };

  return {
    model: currentModel,
    setCurrentModel: setModel,
    clearCurrentModel,
  };
};

export default useCurrentModel;
