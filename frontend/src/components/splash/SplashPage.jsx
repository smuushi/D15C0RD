import { PreLoginNavBar } from "../PreLoginNavBar"
// import splash3 from '/assets/splash/splashbackground3.svg'
import "./splash.css" 

export const SplashPage = () => {




    return (
        <div className="SplashWrapper">
                <PreLoginNavBar />
        
            <div className="FirstModule">
                <div className="DescriptionBox">IMAGINE A PLACE</div>

                <img id="splash1" src="/assets/splash/splashbackground1.svg" />
                <img id="splash2" src="/assets/splash/splashbackground2.svg" />
                <img id="splash3" src='/assets/splash/splashbackground3.svg' />
            </div>

            <div className="SecondModule" >


            </div>

        
        
        
        
        </div>
    )
}