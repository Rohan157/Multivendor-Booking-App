import { diffDays } from "../../actions/hotel";
import { Link, useHistory } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({ h, handleHotelDelete = (f) => f }) => {
  const history = useHistory();
  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            {h.image && h.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotel/image/${h._id}`}
                alt="default hotel img"
                className="card-image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+Hotel"
                alt="default hotel img"
                className="card-image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {h.title}
                <span className="float-right text-primary">{h.price}</span>
              </h3>
              <p className="alert alert-info">{h.location}</p>
              <p className="card-text">{`${h.content.substring(0, 200)}...`}</p>
              <p className="card-text">
                <span className="float-right text-primary">
                  for {diffDays(h.from, h.to)}{" "}
                  {diffDays(h.from, h.to) <= 1 ? " day" : " days"}
                </span>
              </p>
              <p className="card-text">{h.bed}</p>
              <p className="card-text">
                Available from {new Date(h.from).toLocaleDateString()}
              </p>

              <div className="d-flex justify-content-between h4">
                <button
                  onClick={() => history.push(`/hotel/${h._id}`)}
                  className="btn btn-primary"
                >
                  Show More
                </button>
                <Link to={`/hotel/edit/${h._id}`}>
                  <EditOutlined className="text-warning" />
                </Link>
                <DeleteOutlined
                  onClick={() => handleHotelDelete(h._id)}
                  className="text-danger"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SmallCard;
