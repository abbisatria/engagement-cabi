/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'reactstrap'
import { intervalToDuration, isBefore } from "date-fns"
import Kehadiran from '../components/modal/Kehadiran'
import Loading from '../components/loading'
import io from '../helpers/socket';
import { ReactComponent as Image } from '../assets/img/img-partner.svg'
import { ReactComponent as Prokes } from '../assets/img/prokes.svg'
import { ReactComponent as SaveDate } from '../assets/img/save-date.svg'
import Abbi from '../assets/img/abbi.png'
import Tasya from '../assets/img/tasya.png'
import Man from '../assets/img/man-1.png'
import Man1 from '../assets/img/man-2.png'
import Woman from '../assets/img/woman-1.png'
import Woman1 from '../assets/img/woman-2.png'
import { fetchList } from '../services/api';

const futureDate = new Date("2022-02-20 10:00:00")

const Home = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [now, setNow] = useState(new Date())
  const [listTamu, setListTamu] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    if (new Date(now) > futureDate) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [now]);

  useEffect(() => {
    io.on('list', (data) => {
      fetchListTamu();
    });
  }, []);

  const fetchListTamu = async () => {
    try {
      setIsLoading(true)
      const { results, success } = await fetchList();
      if (success) {
        setListTamu(results)
      }
      setIsLoading(false)
      return results
    } catch (err) {
      setIsLoading(false)
      return err
    }
  }

  useEffect(() => {
    fetchListTamu();
  }, []);

  const isTimeUp = isBefore(futureDate, now);

  let { days, hours, minutes, seconds } = intervalToDuration({
    start: now,
    end: futureDate
  });

  const Img = [Man, Man1, Woman, Woman1]

  return (
    <Container fluid className="p-0">
      <Kehadiran
        isOpen={isOpen}
        toggle={toggle}
      />
      <Row className="m-0">
        <Col md={8} className="p-0">
          <div className="banner">
            <p>Engagement Invitation</p>
            <h3>Abbi & Tasya</h3>
            <div className="image">
              <Image />
            </div>
            <h6>20 Februari 2022</h6>
          </div>
        </Col>
        <Col md={4}>
          <div className="content">
            <div className="header">
              Dan segala sesuatu Kami ciptakan berpasang-pasangan supaya kamu mengingat kebesaran Allah
              <br />
              <span>(QS. AZ-ZARIYAT : 49)</span>
            </div>
            <div className="text-center mt-3">
              <Button color="success" type="button" onClick={() => toggle()}>
                <Spinner type="grow" color="warning" size="sm" />{' '}
                Konfirmasi Kehadiran Anda
              </Button>
            </div>
            <div className="mempelai mt-3">
              <h3 className="title">Mempelai</h3>
              <div className="frame-mempelai">
                <div className="image">
                  <img src={Tasya} alt="tasya" />
                </div>
                <h4>Tasya Salsaliantika</h4>
                <p>Seorang wanita baik</p>
              </div>
              <div className="frame-mempelai">
                <div className="image">
                  <img src={Abbi} alt="abbi" />
                </div>
                <h4>Abbi Satria</h4>
                <p>Seorang pria perkasa</p>
              </div>
            </div>
            <div className="text-center">
              <h3 className="title">Galeri</h3>
              <div className="frame-mempelai mb-3">
                <div className="image">
                  <img src={Tasya} alt="tasya" />
                </div>
              </div>
              <div className="frame-mempelai mb-3">
                <div className="image">
                  <img src={Abbi} alt="abbi" />
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="title">Undangan</h3>
              <div className="mempelai-undangan">
                <h4>Tasya Salsaliantika</h4>
                <p>Putri pertama dari dr. H. Toto Taufikurohman Kosim dan Widiasih Kartika Sari, S.T, M.Kom</p>
              </div>
              <span className="with">dengan</span>
              <div className="mempelai-undangan">
                <h4>Abbi Satria</h4>
                <p>Putra ketiga dari Adji dan Alm. Lilis Hartati</p>
              </div>
            </div>
            <div className="text-center mt-3">
              <h4 className="title">Google Maps</h4>
              <div className="maps">
                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.2618797793625!2d108.57353301477326!3d-6.978395894958691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xae349ec394de1ebd!2zNsKwNTgnNDIuMiJTIDEwOMKwMzQnMzIuNiJF!5e0!3m2!1sen!2sid!4v1642387948960!5m2!1sen!2sid" width="250" height="250" style={{ border: 0 }} allowFullScreen={true} loading="lazy" title="maps"></iframe> */}
                <Button className="mt-2" type="button" color="success" size="sm" onClick={() => window.open('https://goo.gl/maps/KQFAPZnT4iE85Yqv9')}>Lihat Maps</Button>
              </div>
            </div>
            <div className="prokes">
              <Prokes />
            </div>
            <div className="save-date">
              <SaveDate />
              <Row>
                <Col md={3} sm={3} xs={3}>
                  <h4>{isTimeUp ? '0' : days}</h4>
                  <p>Days</p>
                </Col>
                <Col md={3} sm={3} xs={3}>
                  <h4>{isTimeUp ? '0' : hours}</h4>
                  <p>Hours</p>
                </Col>
                <Col md={3} sm={3} xs={3}>
                  <h4>{isTimeUp ? '0' : minutes}</h4>
                  <p>Minutes</p>
                </Col>
                <Col md={3} sm={3} xs={3}>
                  <h4>{isTimeUp ? '0' : seconds}</h4>
                  <p>Seconds</p>
                </Col>
              </Row>
            </div>
            <div className="text-center">
              <h4 className="title mt-3">Buku Tamu</h4>
              {isLoading && <Loading />}
              {listTamu.length > 0 && (
                <div className="chat">
                  {listTamu.map((val, idx) => (
                    <div className="card-chat" key={String(idx)}>
                      <div className="image">
                        <img src={Img[val.avatar - 1]} alt="man" />
                      </div>
                      <div>
                        <h6>{val.name}</h6>
                        <p>{val.ucapan}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="footer mt-5">
              <h3>Thank You!</h3>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
