import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleStatus, removeTodo } from "./store/todoSlice";
import { Container, Row, Col, Form, Button, ListGroup, Badge } from "react-bootstrap";

function App() {
  const [task, setTask] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (task.trim() === "") return;
    dispatch(addTodo(task));
    setTask("");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center">To-Do App</h2>

          {/* Input Form */}
          <Form className="d-flex mb-3">
            <Form.Control
              type="text"
              placeholder="Enter task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button variant="primary" className="ms-2" onClick={handleAdd}>
              Add
            </Button>
          </Form>

          {/* Todo List */}
          <ListGroup>
            {todos.map((todo) => (
              <ListGroup.Item
                key={todo.id}
                className="d-flex justify-content-between align-items-center"
              >
                <span
                  onClick={() => dispatch(toggleStatus(todo.id))}
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                >
                  {todo.name}
                </span>

                <div>
                  <Badge
                    bg={todo.completed ? "success" : "warning"}
                    className="me-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => dispatch(toggleStatus(todo.id))}
                  >
                    {todo.completed ? "Done" : "Pending"}
                  </Badge>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => dispatch(removeTodo(todo.id))}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
