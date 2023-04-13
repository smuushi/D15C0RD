import { PreLoginNavBar } from "../PreLoginNavBar"
// import splash3 from '/assets/splash/splashbackground3.svg'
import "./splash.css" 

export const SplashPage = () => {




    return (
        <div className="SplashWrapper">
                <PreLoginNavBar />
        
            <div className="FirstModule">
                <div className="DescriptionBox">
                    <h1>
                        IMAGINE A PLACE...
                    </h1> 
                    <h3>
                    ...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.
                    </h3>
                    
                </div>

                <img id="splash1" src="/assets/splash/splashbackground1.svg" />
                <img id="splash2" src="/assets/splash/splashbackground2.svg" />
                <div className="splash3container">
                    
                <img id="splash3" src='/assets/splash/splashbackground3.svg' />
                </div>
            </div>

            <div className="SecondModule" >
                <img src="/assets/splash/splashmod2.svg" alt="" />

                <section>

                    <h3>About this Discord Clone</h3>

                    <p>D15C0RD is a clone of the popular chat-app fully built with a fullstack architecture. Front-end features ReactJS, and the backend is supported through Ruby On Rails with PostgreSQL. </p>

                    <p>Feel free to create an account and explore the clone!</p>
                </section>

            </div>

            <div className="ThirdModule">
                <section>
                    <h3>Main Features:</h3>

                    <p>
                        <ul>
                            <li> - User authentication</li>
                            <li> - Server CRUD functionality</li>
                            <li> - Channel CRUD functionality</li>
                            <li> - Live-chat messaging with CRUD functionality</li>
                            <li> - Account customization</li>
                        </ul>
                    </p>

                    <p>
                        Servers have an invitation system built out with processing and validation in the backend!
                    </p>
                    <p>    
                        Additionally, all messaging and image hosting is done with the incorporation between websockets and realtime AWS S3 hosting! 
                    </p>
                </section>

                <img src="/assets/splash/splashmod3.svg" alt="" />


            </div>

        
        
        
        
        </div>
    )
}