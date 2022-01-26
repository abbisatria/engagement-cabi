import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, Spinner } from 'reactstrap'
import Swal from 'sweetalert2'
import Man from '../../assets/img/man-1.png'
import Man1 from '../../assets/img/man-2.png'
import Woman from '../../assets/img/woman-1.png'
import Woman1 from '../../assets/img/woman-2.png'
import { setList } from '../../services/api'

const Kehadiran = ({ isOpen, toggle }) => {

  const [avatar, setAvatar] = useState(0)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [ucapan, setUcapan] = useState('')
  const [isLoading, setIsloading] = useState(false)

  const Img = [Man, Man1, Woman, Woman1]

  const submit = async (e) => {
    e.preventDefault()
    try {
      setIsloading(true)
      const payload = {
        name: fullName,
        email,
        ucapan,
        avatar
      }
      const { success } = await setList(payload);
      if (success) {
        setIsloading(false)
        Swal.fire('Success', 'Terimakasih telah mengkonfirmasi kehadiran ✌️', 'success').then(() => {
          toggle()
        })
      }
    } catch (err) {
      setIsloading(false)
      return err;
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Kehadiran
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={submit}>
          <FormGroup>
            <Label>Fullname</Label>
            <Input type="text" placeholder="Drop some text here..." value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input type="text" placeholder="Drop some text here..." value={email} onChange={(e) => setEmail(e.target.value)} />
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
            <Input type="textarea" placeholder="Drop some text here..." value={ucapan} onChange={(e) => setUcapan(e.target.value)} />
          </FormGroup>
          {isLoading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
            <Button type="submit" className="w-100" color="success">Kirim</Button>
          )}
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default Kehadiran
