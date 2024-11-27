import React from "react";
import { Button, Row, Col } from "react-bootstrap";

const TimelineItem = ({ item, index, handleDelete }) => {
  return (
    <Row className="align-items-center my-2">
      <Col md={4}>
        <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}
      </Col>
      <Col md={6}>
        <strong>Next Steps:</strong> {item.nextSteps}
      </Col>
      <Col md={2} className="text-end">
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleDelete(index)}
        >
          Delete
        </Button>
      </Col>
    </Row>
  );
};

export default TimelineItem;

