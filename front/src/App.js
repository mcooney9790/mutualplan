import React, { useState } from "react";
import axios from "axios";
import TimelineItem from "./components/TimelineItem";
import { Container, Form, Button, Row, Col, ListGroup } from "react-bootstrap";

function App() {
  const [timelineItems, setTimelineItems] = useState([]);
  const [newItem, setNewItem] = useState({ date: "", nextSteps: "" });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new timeline entry
  const handleAddItem = () => {
    if (newItem.date && newItem.nextSteps) {
      const newTimeline = [...timelineItems, newItem];
      setTimelineItems(newTimeline);
      setNewItem({ date: "", nextSteps: "" }); // Reset form
    }
  };

  // Delete timeline entry
  const handleDeleteItem = (index) => {
    const updatedTimeline = timelineItems.filter((_, i) => i !== index);
    setTimelineItems(updatedTimeline);
  };

  // Generate PowerPoint by sending data to the backend
// Function to generate PowerPoint and trigger download
const generatePowerPoint = async () => {
  try {
    const response = await axios.post("https://mutualplan-backend.onrender.com/generate-ppt",
      { timeline: timelineItems },
      { responseType: "blob" } // Set response type to blob for file downloads
    );

    // Create a URL for the blob and trigger the download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "timeline_calendar.pptx"); // File name
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link); // Clean up
  } catch (error) {
    console.error("Error generating PowerPoint:", error);
    alert("An error occurred while generating the PowerPoint.");
  }
};

  return (
    <Container>
      <h1 className="mt-4 text-center">Mutual Action Plan to PowerPoint Converter</h1>

      <Form className="my-4">
        <Row>
          <Col md={6}>
            <Form.Group controlId="timelineDate">
              <Form.Label>Timeline Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newItem.date}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="nextSteps">
              <Form.Label>Action Item</Form.Label>
              <Form.Control
                type="text"
                name="nextSteps"
                value={newItem.nextSteps}
                onChange={handleInputChange}
                placeholder="Describe next step"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          variant="primary"
          className="mt-3"
          onClick={handleAddItem}
          disabled={!newItem.date || !newItem.nextSteps}
        >
          Add Timeline Item
        </Button>
      </Form>

      <h3>Timeline Items</h3>
      <ListGroup>
        {timelineItems
          .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date
          .map((item, index) => (
            <ListGroup.Item key={index}>
              <TimelineItem
                index={index}
                item={item}
                handleDelete={handleDeleteItem}
              />
            </ListGroup.Item>
          ))}
      </ListGroup>

      <Row className="mt-4">
        <Col className="text-center">
          <Button
            variant="success"
            onClick={generatePowerPoint}
            disabled={timelineItems.length === 0}
          >
            Generate PowerPoint
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
