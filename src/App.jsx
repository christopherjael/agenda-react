import { useState } from 'react';
import './App.css';
import Agenda from './components/agenda';
import { Table, NextUIProvider, Container, Text } from '@nextui-org/react';
import AddContact from './components/addcontact';

function App() {
  return (
    <NextUIProvider>
      <Container fluid alignContent="center" md>
        <Text h1 weight="bold">
          Agenda React
        </Text>
        <AddContact></AddContact>
        <Agenda></Agenda>
      </Container>
    </NextUIProvider>
  );
}

export default App;
