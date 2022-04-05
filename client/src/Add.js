import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const history = useHistory();
  const { id } = useParams();

  const saveOrUpdateTodo = (e) => {
    e.preventDefault();

    if (id) {
      axios
        .put(`http://localhost:4000/todos/${id}`, {
          name: name,
          description: description,
        })
        .then((response) => {
          setName(response.data);
          setDescription(response.data);
          console.log(response);
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post("http://localhost:4000/todos", {
          name: name,
          description: description,
        })
        .then((response) => {
          console.log(response);

          history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect((id) => {
    axios
      .get(`http://localhost:4000/todos/${id}`)
      .then((response) => {
        setName(response.data);
        setDescription(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const title = () => {
    if (id) {
      return <h2 className="text-center">Update Todo</h2>;
    } else {
      return <h2 className="text-center">Add Todo</h2>;
    }
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Name :</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Description :</label>
                  <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></input>
                </div>

                <button
                  className="btn btn-success"
                  onClick={(e) => saveOrUpdateTodo(e)}
                >
                  Submit{" "}
                </button>
                <Link to="/" className="btn btn-danger">
                  {" "}
                  Cancel{" "}
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
