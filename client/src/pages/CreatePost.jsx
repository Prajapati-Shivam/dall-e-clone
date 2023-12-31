import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import FormField from "../components/FormField";
import Loader from "../components/Loader";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");

  // const generateImage = async () => {
  //   if (form.prompt) {
  //     try {
  //       setGeneratingImg(true);
  //       const response = await fetch("http://localhost:8080/api/v1/create", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ prompt: form.prompt }),
  //       });
  //       const data = await response.json();
  //       setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
  //     } catch (error) {
  //       alert(error);
  //     } finally {
  //       setGeneratingImg(false);
  //     }
  //   } else {
  //     alert("Please enter a prompt");
  //   }
  // };

  const generateImage = async () => {
    if (form.prompt) {
      setGeneratingImg(true);
      const url = "https://open-ai21.p.rapidapi.com/dalle";
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": "1c4d7492a0msh14ac9b1a80f7bf6p1397d7jsn5c1c398f8857",
          "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
        },
        body: JSON.stringify({ text: form.prompt }),
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setForm({ ...form, photo: result.url });
      } catch (error) {
        console.error(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      setAlert("Please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name && form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("https://imagery-uri5.onrender.com/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await response.json();
        navigate("/");
      } catch (error) {
        setAlert(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl text-gray-800">
          Create what to think
        </h1>
        <p className="text-base text-gray-500 max-w-[500px] mt-2">
          Create imaginative and stunning images generated by the Imagery and
          share with the community.
        </p>
      </div>
      {alert && (
        <div className="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{alert}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={() => setAlert("")}
            >
              <title>Close</title>
              <path
                fillRule="evenodd"
                // eslint-disable-next-line max-len
                d="M10.293 8l4.147-4.147a1 1 0 011.414 1.414L11.414 9l4.44 4.44a1 1 0 01-1.414 1.414L10.293 10l-4.147 4.147a1 1 0 11-1.414-1.414L8.586 9 4.147 4.56A1 1 0 115.56 3.146L10.293 8z"
              />
            </svg>
          </span>
        </div>
      )}
      <form className="mt-16" onClick={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Yikes! What's your name?"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="What do you want to think about?"
            name="prompt"
            type="text"
            placeholder="a surrealist dream-like oil painting by Salvador Dalí of a cat playing checkers"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 h-64 p-3 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 rounded-lg bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 px-5 py-2.5 font-medium rounded-md text-sm w-full sm:w-auto text-center"
          >
            {generatingImg ? "Generating..." : "Generate Image"}
          </button>
        </div>
        <div className="mt-10">
          <p className="text-sm text-gray-500 mt-2">
            Once you generate the image, you can share it with the community.
          </p>
          <button
            type="submit"
            className="text-white mt-3 bg-blue-500 px-5 py-2.5 font-medium rounded-md text-sm w-full sm:w-auto text-center"
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
