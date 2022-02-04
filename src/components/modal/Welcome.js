import React from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import Partner from '../../assets/img/cop.png'

const Welcome = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} size="xl">
      <ModalBody className="welcome">
        <div>
          <p>Engagement Invitation</p>
          <h3>Abbi & Tasya</h3>
          <div className="image">
            <img src={Partner} alt="partner" />
          </div>
          <h6>20 Februari 2022</h6>
          <Button color="success" onClick={() => toggle()}>Buka Undangan</Button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default Welcome;
