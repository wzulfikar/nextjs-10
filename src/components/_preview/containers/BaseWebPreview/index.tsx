import { useMemo } from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';

import Grid from '../Grid';

import DatePicker from './DatePicker';
import DragAndDrop from './DragAndDrop';
import PinCode from './PinCode';
import PaymentCard from './PaymentCard';

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
          <Grid
            title="Base Web Preview"
            previewPath="@src/components/_preview/containers/BaseWebPreview"
          >
            <Grid.Cell {...DatePicker}>
              <DatePicker />
            </Grid.Cell>

            <Grid.Cell {...DragAndDrop}>
              <DragAndDrop />
            </Grid.Cell>

            <Grid.Cell {...PinCode}>
              <PinCode />
            </Grid.Cell>

            <Grid.Cell {...PaymentCard}>
              <PaymentCard />
            </Grid.Cell>
          </Grid>
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
}
