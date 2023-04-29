import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotfound({redirect}) {
  const navigate=useNavigate()
  return (
    <section className="page_404 bg-white  py-40 font-serif">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div
                className="four_zero_four_bg h-full"
                style={{
                  backgroundImage: `url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)`,
                  height: `200px`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></div>

              <div className="contant_box_404 mt-20">
                <h3 className="text-4xl font-bold mb-8">
                  Look like you're lost
                </h3>
                <p>The page you are looking for is not available!</p>
                <button
                  onClick={()=>navigate(redirect)}
                  className="link_404 inline-block px-4 py-2 rounded-full bg-green-500 text-white mt-8"
                >
                  Go to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageNotfound;
