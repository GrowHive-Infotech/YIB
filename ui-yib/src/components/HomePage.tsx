import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "./HomePage.css";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const HomePage: React.FC = () => {
    return (
        <div className="home">
            <div className="home_containerbox">
                <div className="home_box">
                    <h2>Top Blogs</h2>

                </div>
                <div className="home_box">
                    <h2>Top Jobs Posted</h2>
                </div>
                <div className="home_box">
                    <h2>Top Interview Questions</h2>
                </div>
            </div>
            <div className="home_carousel">
                <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
                    <div>
                        <img src="/images/update1.jpg" alt="Update 1" />
                        <p className="legend">Update 1: New Feature Released</p>
                    </div>
                    <div>
                        <img src="/images/update2.jpg" alt="Update 2" />
                        <p className="legend">Update 2: Blog Section Improved</p>
                    </div>
                    <div>
                        <img src="/images/update3.jpg" alt="Update 3" />
                        <p className="legend">Update 3: New Job Postings Available</p>
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default HomePage;