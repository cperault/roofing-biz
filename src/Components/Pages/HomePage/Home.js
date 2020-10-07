import React from 'react';
import './home.css';

const Home = ({ logout }) => {
    if (logout) {
        localStorage.setItem("loginStatus", "out");
    }
    return (
        <div className="home-container">
            <div className="hero-container">
                
            </div>
        </div>
        // <div className="home-container">
        //     <h1>Welcome to Roofing Biz</h1>
        //     <p>
        //         <img
        //             className="left_image"
        //             alt="House roofing"
        //             src={require("../../../media/gutters.jpg")}
        //         />
        //         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        //         eiusmod tempor incididunt ut labore et dolore magna aliqua. Aenean
        //         euismod elementum nisi quis. Lorem ipsum dolor sit amet consectetur
        //         adipiscing elit ut aliquam. Euismod elementum nisi quis eleifend
        //         quam adipiscing vitae proin. Vulputate dignissim suspendisse in est
        //         ante in nibh mauris. Sagittis vitae et leo duis ut diam. Eget dolor
        //         morbi non arcu. Id diam maecenas ultricies mi. Est ultricies integer
        //         quis auctor elit. Neque aliquam vestibulum morbi blandit cursus
        //         risus at ultrices. Velit euismod in pellentesque massa placerat duis
        //         ultricies lacus sed. Mi tempus imperdiet nulla malesuada
        //         pellentesque elit eget gravida cum. Ornare massa eget egestas purus
        //         viverra accumsan in. Enim tortor at auctor urna. Id ornare arcu odio
        //         ut sem nulla pharetra. Quis viverra nibh cras pulvinar. Platea
        //         dictumst vestibulum rhoncus est pellentesque. Proin nibh nisl
        //         condimentum id. Nisl tincidunt eget nullam non nisi est sit amet
        //         facilisis. Consectetur adipiscing elit duis tristique. Mattis
        //         vulputate enim nulla aliquet. Euismod in pellentesque massa placerat
        //         duis ultricies lacus.
        //     </p>
        //     <p>
        //         <img
        //             className="right_image"
        //             alt="House roofing"
        //             src={require("../../../media/commercial_roofing.jpg")}
        //         />
        //         Id interdum velit laoreet id. Blandit cursus risus at ultrices.
        //         Morbi enim nunc faucibus a pellentesque sit. Nibh nisl condimentum
        //         id venenatis a condimentum vitae sapien. Erat pellentesque
        //         adipiscing commodo elit at imperdiet dui. Vitae tortor condimentum
        //         lacinia quis vel. Quis viverra nibh cras pulvinar mattis nunc sed.
        //         Justo eget magna fermentum iaculis eu non diam phasellus. Rhoncus
        //         est pellentesque elit ullamcorper dignissim cras tincidunt lobortis
        //         feugiat. Suscipit tellus mauris a diam maecenas sed. Tincidunt vitae
        //         semper quis lectus nulla at volutpat diam ut. Nec feugiat nisl
        //         pretium fusce. Eu consequat ac felis donec et odio pellentesque diam
        //         volutpat. At risus viverra adipiscing at. Hac habitasse platea
        //         dictumst quisque. Pellentesque habitant morbi tristique senectus et
        //         netus. At lectus urna duis convallis convallis tellus id interdum
        //         velit. Leo vel orci porta non pulvinar neque laoreet suspendisse
        //         interdum. Consequat interdum varius sit amet mattis. Arcu cursus
        //         euismod quis viverra nibh cras pulvinar mattis nunc. Facilisis
        //         gravida neque convallis a cras. Lectus urna duis convallis convallis
        //         tellus id interdum velit.
        //     </p>
        //     <p>
        //         <img
        //             className="left_image"
        //             alt="House roofing"
        //             src={require("../../../media/roofing.jpg")}
        //         />
        //         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        //         eiusmod tempor incididunt ut labore et dolore magna aliqua. Aenean
        //         euismod elementum nisi quis. Lorem ipsum dolor sit amet consectetur
        //         adipiscing elit ut aliquam. Euismod elementum nisi quis eleifend
        //         quam adipiscing vitae proin. Vulputate dignissim suspendisse in est
        //         ante in nibh mauris. Sagittis vitae et leo duis ut diam. Eget dolor
        //         morbi non arcu. Id diam maecenas ultricies mi. Est ultricies integer
        //         quis auctor elit. Neque aliquam vestibulum morbi blandit cursus
        //         risus at ultrices. Velit euismod in pellentesque massa placerat duis
        //         ultricies lacus sed. Mi tempus imperdiet nulla malesuada
        //         pellentesque elit eget gravida cum. Ornare massa eget egestas purus
        //         viverra accumsan in. Enim tortor at auctor urna. Id ornare arcu odio
        //         ut sem nulla pharetra. Quis viverra nibh cras pulvinar. Platea
        //         dictumst vestibulum rhoncus est pellentesque. Proin nibh nisl
        //         condimentum id. Nisl tincidunt eget nullam non nisi est sit amet
        //         facilisis. Consectetur adipiscing elit duis tristique. Mattis
        //         vulputate enim nulla aliquet. Euismod in pellentesque massa placerat
        //         duis ultricies lacus.
        //     </p>
        // </div>
    )
}

export default Home;