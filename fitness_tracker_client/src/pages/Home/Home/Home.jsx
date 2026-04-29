import React from 'react';
import Banner from '../../Banner/Banner';
import Featured from '../../Featured/Featured';
import About from '../../About/About';
import Newsletter from '../../Newsletter/Newsletter';
import HomeForumSection from '../../HomeForum/HomeForumSection';
import TeamSection from '../../TeamSection/TeamSection';
import FeaturedClasses from '../../FeaturedClasses/FeaturedClasses';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <About></About>
            <HomeForumSection></HomeForumSection>
            <FeaturedClasses></FeaturedClasses>

            <Newsletter></Newsletter>
            <TeamSection></TeamSection>
        </div>
    );
};

export default Home;