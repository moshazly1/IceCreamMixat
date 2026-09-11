import {
  faArrowRightLong,
  faClock,
  faFileLines,
  faHourglassHalf,
  faMoneyBillWave,
  faSackDollar,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";

import {
  ADDMANTENANCE,
  ADDPROJECT,
  ADDREPORT,
  ALLCLINT,
  ALLPROJECTNAMEOFCLIENT,
  baseURL,
} from "../../../API/API";
import Lodingsubmit from "../../Loding/Loding";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./CssDashbord/Add.css";
export default function AddReport() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    client: "",
    project: "",
    reportType: "",
    report: "",
    startDate: "",
    endDate: "",
  });
  const [AllClint, setClint] = useState([]);
  const [AllProjectOfClient, setAllProjectOfClient] = useState([]);
  const [Idclient, setIdclient] = useState();

  function handleChange(e) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await axios.get(`${baseURL}/${ALLCLINT}`);
        setClint(res.data.data);
      } catch (err) {
        console.error("Error fetching clients:", err);
      }
    }

    fetchClients();
  }, []);

  console.log(Idclient);

  useEffect(() => {
    async function featchProjectName() {
      if (Idclient) {
        try {
          const res = await axios.get(
            `${baseURL}/${ALLPROJECTNAMEOFCLIENT}${Idclient}/`
          );
          setAllProjectOfClient(res.data.data);
        } catch (err) {
          console.log(err);
        }
      }
    }
    featchProjectName();
  }, [Idclient]);

  async function handleSubmit(navigateAfter, saveDraft) {
    setLoading(true);
    try {
      await axios.post(`${baseURL}/${ADDREPORT}/`, {
        ...data,
        save: saveDraft,
      });

toast.success("Saved successfully");

      setData({
        client: "",
        project: "",
        reportType: "",
        report: "",
        startDate: "",
        endDate: "",
      });

      if (navigateAfter) {
        navigate("/DashboardLayout/reports");
      }
    } catch (error) {
      console.error("❌ ", error);
      if (error.response?.status === 400) {
        toast.error("⚠️ Save failed, data might be duplicated or invalid");
      } else {
        toast.error("An error occurred while saving, please try again later");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Lodingsubmit />}
      <ToastContainer position="top-center" />
      <div className="main-content">
        <Container fluid className="p-4">
          {/* 🔙 زر الرجوع */}

          <Row className="justify-content-center">
            <Col className="cardclints">
              <Card
                className="p-4 shadow-sm border-0   "
                style={{ height: "100%" }}
                dir="ltr"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h4 className="fw-bold ">Add Reports</h4>
                  <Link
                    to="/DashboardLayout/reports"
                    className="d-block text-end mb-3"
                  >
                    <FontAwesomeIcon
                      style={{ color: "var(--brand-200)" }}
                      className="fw-bold fs-3"
                      icon={faArrowRightLong}
                    />
                  </Link>
                </div>

                <Form
                  style={{ paddingRight: " 120px" }}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Form.Group className="mb-5" controlId="level">
                    <Form.Label>Client: </Form.Label>
                    <Form.Select
                      required
                      className="custom-select"
                      name="client"
                      value={data.client}
                      onChange={(e) => {
                        handleChange(e);
                        setIdclient(e.target.value);
                      }}
                    >
                      <option value="">Choose Client</option>
                      {AllClint.map((res) => (
                        <option key={res.id} value={res.id}>
                          {res.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-5" controlId="level">
                    <Form.Label>Project Name: </Form.Label>
                    <Form.Select
                      required
                      className="custom-select"
                      name="project"
                      value={data.project}
                      onChange={handleChange}
                    >
                      <option value="">Choose Project Name</option>
                      {AllProjectOfClient.map((res) => (
                        <option key={res.id} value={res.id}>
                          {res.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="floating-label-group mb-5">
                    <Form.Control
                      className="inpoutFeald"
                      type="text"
                      name="reportType"
                      value={data.reportType}
                      onChange={handleChange}
                      placeholder=" "
                      required
                    />
                    <Form.Label>
                      <FontAwesomeIcon
                        className="iconeForm"
                        icon={faFileLines}
                      />
                      <span className="textinpout">Report Type</span>
                    </Form.Label>
                  </Form.Group>

                  <Form.Group className="floating-label-group mb-5">
                    <Form.Control
                      className="inpoutFeald"
                      type="text"
                      name="report"
                      value={data.report}
                      onChange={handleChange}
                      placeholder=" "
                      required
                    />
                    <Form.Label>
                      <FontAwesomeIcon className="iconeForm" icon={faTags} />
                      <span className="textinpout">Report</span>
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="floating-label-group mb-5">
                    <Form.Control
                      className="inpoutFeald"
                      type="date"
                      name="startDate"
                      value={data.startDate}
                      onChange={handleChange}
                      placeholder=" "
                      required
                    />
                    <Form.Label>
                      <FontAwesomeIcon className="iconeForm" icon={faTags} />
                      <span className="textinpout">Start Date</span>
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="floating-label-group mb-5">
                    <Form.Control
                      className="inpoutFeald"
                      type="date"
                      name="endDate"
                      value={data.endDate}
                      onChange={handleChange}
                      placeholder=" "
                      required
                    />
                    <Form.Label>
                      <FontAwesomeIcon className="iconeForm" icon={faTags} />
                      <span className="textinpout">End Date</span>
                    </Form.Label>
                  </Form.Group>

                  {/* ✅ الأزرار */}
                  <div className="d-flex flex-wrap gap-3 mt-4">
                    <Button
                      onClick={() => handleSubmit(true, false)}
                      className="btn_square_green"
                    >
                      Save
                    </Button>

                    <Button
                      onClick={() => handleSubmit(false, false)}
                      className="btn_submit"
                    >
                      Save and add another
                    </Button>
                  </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
