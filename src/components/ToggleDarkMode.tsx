import 'react-toggle/style.css';

import { memo, useEffect, useState } from 'react';
import Toggle from 'react-toggle';
import { HiSun, HiMoon } from 'react-icons/hi';

import useDarkMode from '@src/hooks/useDarkMode';
import { trackGoal, events } from '@src/lib/analytic';

function ToggleDarkMode({ initialValue = true }) {
  const darkMode = useDarkMode(initialValue);

  const [checked, setChecked] = useState(initialValue);

  useEffect(() => {
    setChecked(darkMode.value);
    trackGoal(events.ToggleDarkMode);
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
