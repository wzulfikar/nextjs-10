import { useEffect, useState } from 'react';
import * as dg from 'dis-gui';
import Link from 'next/link';
import { isMobile } from 'react-device-detect';
import { BiHomeCircle } from 'react-icons/bi';
import { DiGithubBadge } from 'react-icons/di';

import useDarkMode from '@src/hooks/useDarkMode';
import trackGoal from '@src/utils/trackGoal';

const positions = {
  topLeft: { top: '0px', left: '0px' },
  topRight: { top: '0px', right: '0px' },
  bottomRight: { bottom: '0px', right: '0px' },
  bottomLeft: { bottom: '0px', left: '0px' },
};

const defaultPosition = 'bottomRight';

/**
 * `DisGui` renders the available controls for preview components such as
 * props, class wrapper, etc.
 *
 */
export default function DisGui({
  componentKeys,
  bgColors,
  value,
  openInGithub,
  onChange,
  previewProps,
  onChangePreviewProps,
}) {
  const [position, setPosition] = useState(null);

  const darkMode = useDarkMode(false);

  useEffect(() => {
    const persistedPosition =
      localStorage.getItem('disguiPosition') || defaultPosition;
    setPosition(persistedPosition);
  }, []);

  useEffect(() => {
    if (position) localStorage.setItem('disguiPosition', position);
  }, [position]);

  function onChangePosition(val) {
    setPosition(val);
  }

  // Wrap dg.GUI so we can change its position at runtime
  const GuiWrapper = ({ children }) => (
    <dg.GUI
      className="gui-wrapper"
      style={positions[position]}
      expanded={!isMobile}
    >
      {children}
    </dg.GUI>
  );

  return (
    position && (
      <GuiWrapper>
        <dg.Select
          label="Component"
          options={componentKeys}
          value={value.component}
          onChange={(val) => onChange({ component: val })}
        />
        <dg.Text
          label="Wrapper"
          value={value.wrapper || ''}
          onFinishChange={(val) => onChange({ wrapper: val })}
        />

        {/* Render preview props */}
        <dg.Folder
          label={`Preview Props (${Object.keys(previewProps).length})`}
          expanded={true}
        >
          {Object.keys(previewProps).map((propName) =>
            typeof previewProps[propName] === 'number' ? (
              <dg.Number
                key={propName}
                label={propName}
                value={previewProps[propName]}
                onFinishChange={(val) =>
                  onChangePreviewProps({ [propName]: val })
                }
              />
            ) : typeof previewProps[propName] === 'boolean' ? (
              <dg.Checkbox
                key={propName}
                label={propName}
                checked={Boolean(previewProps[propName])}
                onFinishChange={(val) =>
                  onChangePreviewProps({ [propName]: val })
                }
              />
            ) : (
              <dg.Text
                key={propName}
                label={propName}
                value={previewProps[propName]}
                onFinishChange={(val) =>
                  onChangePreviewProps({ [propName]: val })
                }
              />
            )
          )}
        </dg.Folder>

        <dg.Folder label={`Links`} expanded={true}>
          {openInGithub && (
            <dg.Button
              className="w-5"
              label={
                <a
                  href={openInGithub}
                  onClick={() => trackGoal('Preview_ClickOpenInGithub')}
                  className="flex items-center justify-center"
                >
                  <DiGithubBadge className="w-4 h-4 mr-0.5" />
                  Open in Github
                </a>
              }
            />
          )}
          <dg.Button
            label={
              <Link href="/">
                <a
                  onClick={() => trackGoal('Preview_ClickBackToHome')}
                  className="flex items-center justify-center h-4"
                >
                  <BiHomeCircle className="relative top-[-1px] mr-1" />
                  Back to home
                </a>
              </Link>
            }
          />
        </dg.Folder>

        <dg.Select
          label="Background"
          options={bgColors}
          value={value.bgColor}
          onChange={(val) => onChange({ bgColor: val })}
        />
        <dg.Checkbox
          label="Dark Mode"
          value={darkMode.value}
          checked={darkMode.value}
          onFinishChange={darkMode.toggle}
        />
        <dg.Select
          label="Control Position"
          options={Object.keys(positions)}
          value={position}
          onChange={onChangePosition}
        />
      </GuiWrapper>
    )
  );
}
