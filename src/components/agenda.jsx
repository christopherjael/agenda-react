import React from 'react';
import {
  Table,
  Input,
  Spacer,
  useAsyncList,
  useCollator,
  Button,
} from '@nextui-org/react';

export default function Agenda() {
  const collator = useCollator({ numeric: true });
  async function load() {
    const res = await fetch('http://www.raydelto.org/agenda.php');
    const json = await res.json();
    return {
      items: json,
    };
  }
  async function sort({ items, sortDescriptor }) {
    return {
      items: items.sort((a, b) => {
        let first = a[sortDescriptor.column];
        let second = b[sortDescriptor.column];
        let cmp = collator.compare(first, second);
        if (sortDescriptor.direction === 'descending') {
          cmp *= -1;
        }
        return cmp;
      }),
    };
  }
  const list = useAsyncList({ load, sort });
  return (
    <>
      <Spacer y={0.5} />
      <Input
        clearable
        bordered
        labelPlaceholder="Name"
        label="Search"
        width="50%"
        css={{ mx: 'auto' }}
        borderWeight="bold"
      />
      <Spacer y={1} />

      <Table
        aria-label="contacts"
        css={{
          height: 'auto',
          minWidth: '100%',
        }}
        bordered
        shadow={true}
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
      >
        <Table.Header>
          <Table.Column key="nombre">NAME</Table.Column>
          <Table.Column key="apellido">LASTANME</Table.Column>
          <Table.Column key="telefono">PHONE</Table.Column>
        </Table.Header>

        <Table.Body
          items={list.items}
          loadingState={list.loadingState}
          onLoadMore={list.loadMore}
        >
          {(item) => (
            <Table.Row key={item.nombre}>
              {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  );
}
