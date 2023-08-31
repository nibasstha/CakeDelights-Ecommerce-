//rafce to create format
import React, { useEffect, useState } from "react";

//import testapi
import { getAllProductsApi, testApi } from "../../apis/api";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllProductsApi()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate=useNavigate()
  //navigate to search page when search button is clicked
  const handleSearch=(e)=>{
    e.preventDefault();
    navigate(`/search/${searchQuery}`)
  }

  return (
    <div className="container mt-5">
      <form action="">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          className="form-control mb-3"
          placeholder="Search Product"
        />
        <button onClick={handleSearch} type="submit" hidden>
          Submit
        </button>
      </form>

      <div
        id="carouselBasicExample"
        class="carousel slide carousel-fade"
        data-mdb-ride="carousel"
      >
        {/* <!-- Indicators --> */}
        <div class="carousel-indicators">
          <button
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        {/* <!-- Inner --> */}
        <div class="carousel-inner">
          {/* <!-- Single item --> */}
          <div class="carousel-item active">
            <img
              src="assets/images/cake.jpg"
              class="d-block w-100"
              alt="Sunset Over the City"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Every cake is a canvas; every bite is a masterpiece.</h5>
            </div>
          </div>

          {/* <!-- Single item --> */}
          <div class="carousel-item">
            <img
              src="assets/images/1.jpg"
              class="d-block w-100"
              alt="Canyon at Nigh"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Love is like a piece of cake, sweet and satisfying.l</h5>
            </div>
          </div>

          {/* <!-- Single item --> */}
          <div class="carousel-item">
            <img
              src="assets/images/2.jpg"
              class="d-block w-100"
              alt="Cliff Above a Stormy Sea"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Let's eat cake and have a sweet celebration!</h5>
            </div>
          </div>
        </div>
        {/* <!-- Inner --> */}

        {/* <!-- Controls --> */}
        <button
          class="carousel-control-prev"
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      {/* <!-- Carousel wrapper --> */}
      <div>
        <h1 className="mt-5 mb-4 text-danger text-center">
          Available <span className="text-black">Products</span>{" "}
        </h1>
        <div class="row row-cols-1 row-cols-md-4">
          {products.map((product) => {
            return (
              <Link to={`/product/details/${product._id}`} class="col">
                <div class="card mb-3">
                  <img
                    src={product.image}
                    class="card-img-top object-cover"
                    alt="Hollywood Sign on The Hill"
                    width={"100px"}
                    height={"220px"}
                  />
                  <div class="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 class="card-title text-black">{product.name}</h5>
                      <h5 class="card-title text-black">NPR.{product.price}</h5>
                    </div>
                    <hr />
                    <p className="text-black">{product.description}</p>
                    <button className="btn w-100 btn-outline-black">
                      View more
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
