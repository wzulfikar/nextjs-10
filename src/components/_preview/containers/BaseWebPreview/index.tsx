import { useMemo } from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';

import GridCell from '../GridCell';

import DatePicker from './DatePicker';
import DragAndDrop from './DragAndDrop';
import PinCode from './PinCode';

/**
 * Preview for baseweb components. If you don't want to use baseweb, remove these packages:
 * `yarn remove baseui styletron-engine-atomic styletron-react @types/styletron-standard @types/styletron-react @types/styletron-engine-atomic`
 *
 * @see
 * https://v9-9-0.baseweb.design
 */
export default function BaseWebPreview() {
  const engine = useMemo(() => new Styletron(), []);

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <div className="my-5 overflow-auto">
          <div className="sm:grid sm:grid-cols-3 gap-3 px-3 max-w-6xl">
            <GridCell {...DatePicker}>
              <DatePicker />
            </GridCell>

            <GridCell {...DragAndDrop}>
              <DragAndDrop />
            </GridCell>

            <GridCell {...PinCode}>
              <PinCode />
            </GridCell>
          </div>
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
}
