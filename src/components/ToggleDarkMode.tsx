import 'react-toggle/style.css';

import { memo, useEffect, useState } from 'react';
import Toggle from 'react-toggle';
import { HiSun, HiMoon } from 'react-icons/hi';
import { usePrevious } from 'react-use';

import useDarkMode from '@src/hooks/useDarkMode';
import trackGoal from '@src/utils/trackGoal';

function ToggleDarkMode({ initialValue = true }) {
  const darkMode = useDarkMode(initialValue);

  const [checked, setChecked] = useState(initialValue);

  const prevDarkMode = usePrevious(darkMode.value);

  useEffect(() => {
    setChecked(darkMode.value);

    if (!prevDarkMode && darkMode.value) {
      // Track if dark mode has been enabled
      trackGoal('DarkMode_Enabled');
    } else if (prevDarkMode && !darkMode.value) {
      // Only track `DarkMode_Disabled` if it was previously enabled
      trackGoal('DarkMode_Disabled');
    }
  }, [darkMode.value]);

  return (
    <div className="toggle-dark-mode">
      <style jsx global>{`
        .react-toggle-track {
          background-color: #000 !important;
        }

        .dark .react-toggle-track {
          background-color: #444 !important;
        }

        .react-toggle-thumb {
          box-shadow: none !important;
          border-color: transparent !important;
        }
      `}</style>
      <Toggle
        checked={checked}
        icons={{
          checked: (
            <HiSun className="relative bottom-1 right-0.5 w-4 h-4 text-white" />
          ),
          unchecked: (
            <HiMoon className="relative bottom-1 right-0.5 w-4 h-4 text-white" />
          ),
        }}
        onChange={darkMode.toggle}
      />
    </div>
  );
}

export default memo(ToggleDarkMode);
