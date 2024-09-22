import React from "react";
import "./styles.css";
import Blog from "./Blog";

const Hero = () => {
  return (
    <>
      <div className="container">
        <div className="Hero-section">
          <h1>Your Adventure Awaits! Start Exploring Now</h1>
          <p>
            Welcome to Notez —your go-to spot for fresh insights, stories, and
            inspiration. Dive into topics that matter, join the conversation,
            and stay updated with our latest posts. Let's explore together!
          </p>
        </div>

        <div className="heading-blog">
          <h1>Our Blogs</h1>
        </div>
        <Blog />
      </div>
    </>
  );
};

export default Hero;
