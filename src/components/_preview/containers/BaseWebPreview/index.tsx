import { useMemo } from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';

import Grid from '../Grid';

import DatePicker from './DatePicker';
import DragAndDrop from './DragAndDrop';
import PinCode from './PinCode';
import PaymentCard from './PaymentCard';
import ProgressBar from './ProgressBar';

import FileUploader from './FileUploader';
import Menu from './Menu';
import Rating from './Rating';
import Select from './Select';

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

            <Grid.Cell {...ProgressBar}>
              <ProgressBar />
            </Grid.Cell>

            <Grid.Cell {...FileUploader}>
              <FileUploader />
            </Grid.Cell>

             <Grid.Cell {...Menu}>
               <Menu />
             </Grid.Cell>
                    
              <Grid.Cell {...Rating}>
               <Rating />
             </Grid.Cell>
                    
               <Grid.Cell {...Select}>
                <Select />
             </Grid.Cell>
          </Grid>
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
}
