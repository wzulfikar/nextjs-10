import * as React from 'react';
import { List, arrayMove, arrayRemove } from 'baseui/dnd-list';

DragAndDrop.title = 'DragAndDrop';
DragAndDrop.url = 'https://v9-9-0.baseweb.design/components/dnd-list';

export default function DragAndDrop() {
  const [items, setItems] = React.useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
  ]);
  return (
    <List
      items={items}
      removable
      onChange={({ oldIndex, newIndex }) =>
        setItems(
          newIndex === -1
            ? arrayRemove(items, oldIndex)
            : arrayMove(items, oldIndex, newIndex)
        )
      }
    />
  );
}
