import React, { useEffect, useRef } from 'react';
import { Text, useModal, Button, Modal, Input, Row } from '@nextui-org/react';

export default function AddContact(props) {
  const { setVisible, bindings } = useModal();
  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const addContact = (name, lastName, phone) => {
    const nombre = name;
    const apellido = lastName;
    const telefono = phone;
    const contacto = { nombre, apellido, telefono };
    console.log(contacto);
    fetch('http://www.raydelto.org/agenda.php', {
      method: 'POST',
      body: JSON.stringify(contacto),
    });
    setVisible(false);
  };
  let n;
  let ln;
  let p;
  useEffect(() => {
    n = nameRef.value;
    ln = lastNameRef.value;
    p = phoneRef.value;
  }, []);

  return (
    <div>
      <Button shadow color="success" onClick={() => setVisible(true)}>
        Add
      </Button>
      <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
        blur
      >
        <Modal.Header>
          <Text id="modal-title" size={18} b>
            Add new contact
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Name"
            ref="nameRef"
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Lastname"
            ref="lastNameRef"
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Phone"
            ref="phoneRef"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setVisible(false)}>
            Close
          </Button>
          <Button auto onClick={() => setVisible(false)}>
            Agree
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
