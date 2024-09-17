import React, { createContext, useState, useContext } from 'react';
import { TreeSetting, defaultSetting } from './SettingsData'

const SettingsContext = createContext<{
    setting: TreeSetting;
    setSetting: React.Dispatch<React.SetStateAction<TreeSetting>>;
}>({
    setting: defaultSetting,
    setSetting: () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [setting, setSetting] = useState<TreeSetting>(defaultSetting);

    return (
        <SettingsContext.Provider value={{ setting, setSetting }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useTreeSetting = () => useContext(SettingsContext);