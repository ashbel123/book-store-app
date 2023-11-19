import axios from "axios";
import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";

const FilterBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(null);
  const [clicked, setClicked] = useState(false);
  const fetchFilter = async () => {
    if (!title && !author && !publishYear) {
      setStatus("No Filter Criteria Provided");
      return;
    }
    if (publishYear && !/^\d{4}$/.test(publishYear)) {
      setStatus("Give a Valid Publish Year");
      return;
    }
    const filter = {
      title: title,
      author: author,
      publishYear: publishYear,
    };
    const queryString = new URLSearchParams(filter).toString();
    await axios
      .get(`http://localhost:5000/books/get/filter?${queryString}`)
      .then((res) => {
        console.log(res.data);
        console.log(res.status);

        if (res.status === 200) {
          console.log("inside");
          setStatus(null);
          setData(res.data);
          if (!Array.isArray(res.data)) {
            setStatus(res.data);
          }
          return;
        }
        setStatus(res.data);
      })
      .catch((err) => {
        setStatus(err.message);
        console.log(err.message);
      });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setClicked(true);

    await fetchFilter();

    // scrollToBottom();
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeAuthor = (e) => {
    setAuthor(e.target.value);
  };
  const onChangePublishYear = (e) => {
    setPublishYear(e.target.value);
  };
  function scrollToBottom() {
    // Scroll to the bottom of the page
    window.scrollTo(0, document.body.scrollHeight);
  }

  useEffect(() => {
    if (clicked) {
      scrollToBottom();
    }
  }, [data, clicked]);

  return (
    <>
      <div className="p-4 bg-blue-200 min-h-screen">
        <BackButton />
        <h1 className="text-3xl my-4 text-center">
          Search the Records with filters
        </h1>

        <form
          onSubmit={onSubmitHandler}
          className="mx-auto max-w-2xl bg-white p-6 rounded-md shadow-md"
        >
          <div className="mb-4">
            <label className="text-xl mr-4 text-gray-500">Title:</label>
            <input
              type="text"
              placeholder="title-filter"
              value={title}
              onChange={onChangeTitle}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="text-xl mr-4 text-gray-500">Author:</label>
            <input
              type="text"
              placeholder="author-filter"
              value={author}
              onChange={onChangeAuthor}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="text-xl mr-4 text-gray-500">Publish Year:</label>
            <input
              type="text"
              placeholder="publish-year-filter"
              value={publishYear}
              onChange={onChangePublishYear}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="p-2 bg-sky-300 m-8 text-white rounded transition duration-300 hover:bg-sky-400"
          >
            Apply Filter
          </button>
        </form>
        <div className="mt-8">
          {!clicked ? (
            ""
          ) : status ? (
            <h3 className="text-center">{status}</h3>
          ) : (
            <table className="w-full text-center">
              <thead>
                <tr>
                  <th className="border border-black px-4 py-2">No.</th>
                  <th className="border border-black px-4 py-2">Title</th>
                  <th className="border border-black px-4 py-2">Author</th>
                  <th className="border border-black px-4 py-2">
                    Publish Year
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, index) => (
                  <tr key={d._id}>
                    <td className="border border-black px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-black px-4 py-2">{d.title}</td>
                    <td className="border border-black px-4 py-2">
                      {d.author}
                    </td>
                    <td className="border border-black px-4 py-2">
                      {d.publishYear}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterBooks;
