import 'react-toggle/style.css';

import { memo, useEffect, useState } from 'react';
import Toggle from 'react-toggle';
import { HiSun, HiMoon } from 'react-icons/hi';
import { usePrevious } from 'react-use';

import useDarkMode from '@src/hooks/useDarkMode';
import { trackGoal } from '@src/lib/analytic';
import { events } from '@src/config/analytic';

function ToggleDarkMode({ initialValue = true }) {
  const darkMode = useDarkMode(initialValue);

  const [checked, setChecked] = useState(initialValue);

  const prevDarkMode = usePrevious(darkMode.value);

  useEffect(() => {
    setChecked(darkMode.value);

    if (!prevDarkMode && darkMode.value) {
      // Track if dark mode has been enabled
      trackGoal(events.DarkMode_Enabled);
    } else if (prevDarkMode && !darkMode.value) {
      // Only track `DarkMode_Disabled` if it was previously enabled
      trackGoal(events.DarkMode_Disabled);
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
            <HiSun className="h-4 w-4 relative bottom-1 right-0.5 text-white" />
          ),
          unchecked: (
            <HiMoon className="h-4 w-4 relative bottom-1 right-0.5 text-white" />
          ),
        }}
        onChange={darkMode.toggle}
      />
    </div>
  );
}

export default memo(ToggleDarkMode);
