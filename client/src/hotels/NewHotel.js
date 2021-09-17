import { useState } from "react";
import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
import { createHotel } from "../actions/hotel";
import { useSelector } from "react-redux";
import HotelCreateForm from "../components/forms/HotelCreateForm";

const NewHotel = () => {
  //redux
  const { auth } = useSelector((state) => ({ ...state }));

  //state
  const [values, setValues] = useState({
    title: "",
    content: "",
    loaction: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  //destructuring variables from state
  const { title, content, location, image, price, from, to, bed } = values;

  let hotelData = new FormData();
  hotelData.append("title", title);
  hotelData.append("content", content);
  hotelData.append("location", location);
  hotelData.append("price", price);
  image && hotelData.append("image", image);
  hotelData.append("from", from);
  hotelData.append("to", to);
  hotelData.append("bed", bed);

  //we have to send the state data as Form data to the backend
  //we could have just send the json state data but due to img, we have to convert it to Form data
  //hotelData here is the converted Form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await createHotel(auth.token, hotelData);
      console.log("HOTEL CREATE RES", res);
      toast("New hotel Posted");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };
  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />

            <HotelCreateForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_img"
              className="img img-fluid m-2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
