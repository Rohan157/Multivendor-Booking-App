import { DatePicker, Select } from "antd";
import moment from "moment";

const { Option } = Select;

const HotelEditForm = (props) => {
  const { values, setValues, handleChange, handleImageChange, handleSubmit } =
    props;
  const { title, content, price, location, bed, from, to } = values;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
          Upload Image!
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />
        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Content"
          className="form-control m-2"
          value={content}
        />

        <input
          className="form-control m-2 "
          placeholder="Location"
          value={location}
          onChange={handleChange}
          style={{ height: "50px" }}
        />

        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price in Rs."
          className="form-control m-2"
          value={price}
        />
        {/* <input
          type="number"
          name="bed"
          onChange={handleChange}
          placeholder="Number of beds"
          className="form-control m-2"
          value={bed}
        /> */}
        <Select
          onChange={(value) => setValues({ ...values, bed: value })}
          className="w-100 m-2 "
          size="large"
          placeholder="Number of beds"
          value={bed}
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
          <Option key={4}>{4}</Option>
        </Select>
        {from && (
          <DatePicker
            defaultValue={moment(from, "YYYY-MM-DD")}
            placeholder="From date"
            className="form-control m-2"
            onChange={(date, dateString) =>
              setValues({ ...values, from: dateString })
            }
            disabledDate={(current) =>
              current && current.valueOf() < moment().subtract(1, "days")
            }
          />
        )}
        {to && (
          <DatePicker
            defaultValue={moment(to, "YYYY-MM-DD")}
            placeholder="To date"
            className="form-control m-2"
            onChange={(date, dateString) =>
              setValues({ ...values, to: dateString })
            }
            disabledDate={(current) =>
              current && current.valueOf() < moment().subtract(0, "days")
            }
          />
        )}
      </div>
      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );
};

export default HotelEditForm;
