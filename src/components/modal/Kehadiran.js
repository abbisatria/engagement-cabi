import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import Man from '../../assets/img/man-1.png'
import Man1 from '../../assets/img/man-2.png'
import Woman from '../../assets/img/woman-1.png'
import Woman1 from '../../assets/img/woman-2.png'

const Kehadiran = ({ isOpen, toggle }) => {

  const [avatar, setAvatar] = useState(0)

  const Img = [Man, Man1, Woman, Woman1]

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Kehadiran
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Fullname</Label>
            <Input type="text" placeholder="Drop some text here..." />
          </FormGroup>
          <FormGroup>
            <Label>Pilih Avatar</Label>
            <Row>
              {Img.map((val, idx) => (
                <Col key={String(idx)} xs={2} sm={2} md={2}>
                  <div className={avatar === idx ? "image-avatar-active" : "image-avatar"} onClick={() => setAvatar(idx)}>
                    <img src={val} alt={`man${idx + 1}`} />
                  </div>
                </Col>
              ))}
            </Row>
          </FormGroup>
          <FormGroup>
            <Label>Ucapan</Label>
            <Input type="textarea" placeholder="Drop some text here..." />
          </FormGroup>
          <Button type="submit" className="w-100" color="success">Kirim</Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default Kehadiran
