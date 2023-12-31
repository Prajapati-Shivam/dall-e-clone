import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import FormField from "../components/FormField";
import Loader from "../components/Loader";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return <h2 className="text-xl font-bold mt-5 text-blue-500">{title}</h2>;
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPost, setAllPost] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResult, setSearchedResult] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchAllPost = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://imagery-uri5.onrender.com/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();
          setAllPost(result.data.reverse());
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPost();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPost.filter(
          (post) =>
            post.name.toLowerCase().includes(searchText.toLowerCase()) ||
            post.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResult(searchResults);
      }, 500)
    )
    
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl text-gray-800">
          Community Showcase
        </h1>
        <p className="text-base text-gray-500 max-w-[500px] mt-2">
          Browse through the collection of imaginative and stunning images
          generated by the Imagery.
        </p>
      </div>

      <div className="mt-16">
        <FormField 
          type="text"
          name="search"
          labelName="Search post"
          placeholder="Search post"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="mb-3 text-xl font-medium text-gray-500">
                Showing results for{" "}
                <span className="text-gray-800">{searchText}</span>
              </h2>
            )}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchText ? (
                <RenderCards data={searchedResult} title="No results found" />
              ) : (
                <RenderCards data={allPost} title="No posts to show" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
