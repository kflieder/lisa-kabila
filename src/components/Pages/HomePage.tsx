import Header from "@/components/Header";
import HomeBottomText from "@/components/Home/HomeBottomText";
import HomeTextBox from "@/components/Home/HomeTextBox";
import ImageSlider from "@/components/Home/ImageSlider";
import MissionStoryText from "@/components/Home/MissionStoryText";
import SocialLinks from "@/components/Home/SocialLinks";


function HomePage({setActiveTabFromImageSliderFromHomePage}: {setActiveTabFromImageSliderFromHomePage: (tab: 'home' | 'products') => void}) {
  return (
      <div className="h-screen flex flex-col justify-between items-center w-full mx-auto space-y-20 pt-5 sm:pt-15">
        <div className="flex sm:flex-row flex-col items-center gap-20 sm:gap-10 sm:px-10 w-full justify-center items-center">
          <HomeTextBox />
          <ImageSlider setActiveTabFromImageSlider={setActiveTabFromImageSliderFromHomePage} />
        </div>
        <div className="flex flex-col justify-center items-center gap-10 sm:px-10 border border-slate-300 rounded-xl bg-yellow-50/80 p-6 shadow-sm backdrop-blur-sm sm:w-[80vw] w-[90vw]">
        <div>
          <img src='/home/weaving.jpg' alt='Weaving' className='h-40 w-96 object-cover rounded-lg shadow-md' />
        </div>
          <MissionStoryText />
          <SocialLinks />
        </div>
        <div className="pb-5">
          <HomeBottomText />
        </div>
     </div>
  )
}

export default HomePage
