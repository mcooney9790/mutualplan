import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import TimelineItem from './TimelineItem';

const Timeline = ({ timelineItems }) => {
  // Function to send timeline data to Flask backend for PowerPoint generation
  const generateCalendarPPT = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate-ppt', {
        timeline: timelineItems,
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error generating PowerPoint:', error);
      alert('An error occurred while generating the PowerPoint.');
    }
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <Button variant="success" onClick={generateCalendarPPT}>
            Generate Calendar in PPT
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Timeline;

