import Header from "@/components/Header";
import HomeBottomText from "@/components/Home/HomeBottomText";
import HomeTextBox from "@/components/Home/HomeTextBox";
import ImageSlider from "@/components/Home/ImageSlider";
import MissionStoryText from "@/components/Home/MissionStoryText";
import SocialLinks from "@/components/Home/SocialLinks";


function HomePage({setActiveTabFromImageSliderFromHomePage}: {setActiveTabFromImageSliderFromHomePage: (tab: 'home' | 'products') => void}) {
  return (
      <div className="h-auto flex flex-col justify-around items-center w-full mx-auto space-y-15">
        <div className="flex w-full ">
          {/* <HomeTextBox /> */}
          <ImageSlider setActiveTabFromImageSlider={setActiveTabFromImageSliderFromHomePage} />
        </div>
        <div>
          <HomeBottomText />
        </div>
        <div className="flex flex-col justify-center items-center gap-10 sm:px-10 border border-slate-300 rounded-xl p-6 shadow-sm backdrop-blur-sm sm:w-[80vw] w-[90vw] mb-10">
          <SocialLinks />
        <div>
          <img src='/home/weaving.jpg' alt='Weaving' className='h-40 w-96 object-cover rounded-lg shadow-md' />
        </div>
          <MissionStoryText />
          
        </div>
        
     </div>
  )
}

export default HomePage
