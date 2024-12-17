import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Button,
  List,
  Image,
  Form,
  Input,
  Select,
  Modal,
  message,
  Row,
  Col,
} from "antd";
import { useBasket } from "./BasketProvider";

import axios from 'axios';

const { Title, Text } = Typography;
const { Option } = Select;

const kenyanCounties = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret",
  "Thika", "Machakos", "Meru", "Nyeri", "Malindi",
];

const Checkout = () => {
  const { basket, dispatch } = useBasket();
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [form] = Form.useForm();
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mpesaPhone, setMpesaPhone] = useState("");

  const totalAmount = basket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (basket.length === 0) {
      message.warning("Your basket is empty!");
      return;
    }

    setIsModalVisible(true);
  };

  const handleMpesaPayment = () => {
    if (!/^07\d{8}$/.test(mpesaPhone)) {
      message.error("Enter a valid Kenyan phone number (e.g., 0712345678)");
      return;
    }

    setIsPlacingOrder(true);
    message.info("Initiating M-Pesa payment...");

    setTimeout(() => {
      message.success("Payment successful! Order placed.");
      setIsModalVisible(false);
      dispatch({ type: "CLEAR_BASKET" });
      form.resetFields();
      setIsPlacingOrder(false);
      navigate("/");
    }, 3000);
  };


  const [message, setMessage] = useState(""); // Previously 'setMessage'
 
  const [response, setRespnse] = useState(); // Previously 'setMessage'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPlacingOrder(true); // Start loading state
    setMessage(""); // Clear previous messages

    try {
      // Ensure phoneNumber and amount are defined properly
      const response = await axios.post("https://jimmy-server.onrender.com/api/initiate-payment", {
        phoneNumber: mpesaPhone, // Use the correct state value
        amount: totalAmount, // Use the totalAmount prop
      });

      setMessage("Payment initiated. Please check your phone for the STK push.");
      console.log(response.data);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error(error);
    }

    setIsPlacingOrder(false); // Stop loading state
  };



  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Row gutter={[16, 16]}>
        {/* Shipping Details */}
        <Col xs={24} md={14}>
          <Card title="Shipping Details">
            <Form
              form={form}
              layout="vertical"
              onFinish={handlePlaceOrder}
            >
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: "Please enter your full name" }]}
              >
                <Input placeholder="Enter Full Name" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Please enter your address" }]}
              >
                <Input placeholder="Enter Address" />
              </Form.Item>
              <Form.Item
                name="country"
                label="Country"
                rules={[{ required: true, message: "Please enter your address" }]}
              >
                <Input placeholder="Enter Country" />
              </Form.Item>
              <Form.Item
                name="county"
                label="County"
                rules={[{ required: true, message: "Please select your county" }]}
              >
                <Select
                  placeholder="Select County"
                  onChange={(value) => setSelectedCounty(value)}
                >
                  {kenyanCounties.map((county) => (
                    <Option key={county} value={county}>
                      {county}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: "Please enter your address" }]}
              >
                <Input placeholder="Enter City" />
              </Form.Item>
            
              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Pay With Mpesa
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Summary Section */}
        <Col xs={24} md={10}>
          <Card title="Order Summary" style={{ marginBottom: "20px" }}>
            <List
              itemLayout="horizontal"
              dataSource={basket}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Image src={item.image} alt={item.title} width={50} />}
                    title={item.title}
                    description={`Ksh ${item.price.toFixed(2)} x ${item.quantity}`}
                  />
                  <Text strong>Ksh {(item.price * item.quantity).toFixed(2)}</Text>
                </List.Item>
              )}
            />
          </Card>
          <Card title="Billing Summary">
            <div style={{ marginBottom: "10px" }}>
              <Text>Sub Total: </Text>
              <Text strong>Ksh {totalAmount.toFixed(2)}</Text>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <Text>Shipping: </Text>
              <Text strong>Free</Text>
            </div>
            <div style={{ marginBottom: "10px", fontSize: "18px" }}>
              <Text>Total: </Text>
              <Text strong>Ksh {totalAmount.toFixed(2)}</Text>
            </div>
         
          </Card>
        </Col>
      </Row>

      {/* M-Pesa Modal */}
           {/* M-Pesa Modal */}
           <Modal
        title="M-Pesa Payment"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <p>
          Total Amount: <Text strong>Ksh {totalAmount.toFixed(2)}</Text>
        </p>
        <Form layout="vertical" onSubmitCapture={handleSubmit}>
          <Form.Item
            label="M-Pesa Phone Number"
            rules={[
              { required: true, message: "Please enter your M-Pesa phone number" },
            ]}
          >
            <Input
              value={mpesaPhone}
              onChange={(e) => setMpesaPhone(e.target.value)}
              placeholder="Enter M-Pesa Phone Number"
            />
          </Form.Item>
          <Button
            type="primary"
            block
            onClick={handleSubmit}
            loading={isPlacingOrder} // Loading state
          >
            Initiate Payment
          </Button>
        </Form>
        {message && <p>{message}</p>} {/* Display message */}
      </Modal>

    </div>
  );
};

export default Checkout;
