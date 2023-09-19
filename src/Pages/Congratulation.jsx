import { useState } from "react";
import ButtonLevel from "../Components/ButtonLevel";
import HeroHomePage from "../Assets/Hero Home Page.png";
import VektorBlobSatu from "../Assets/Vector-Blob-1.png";
import VektorBlobDua from "../Assets/Vector-Blob-2.png";
import VektorBlobTiga from "../Assets/Vector-Blob-3.png";

const Home = () => {
  return (
    <div className="overflow-hidden flex flex-col md:flex-row justify-between h-[100vh] bg-red-600 relative">
      <div className="text-center p-4 py-4 rounded-[10px] md:rounded-none bg-transparent relative z-10 md:w-[50%] mx-auto my-auto md:max-w-[600px]">
        <div
          className="mt-10 py-5 md:py-10 mb-3 w-full"
          style={{
            borderRadius: "20px",
            background: "#DC2626",
            boxShadow:
              "0px 0.44276px 2.28762px 0px rgba(0, 0, 0, 0.04), 0px 1.06402px 7.25536px 0px rgba(0, 0, 0, 0.06), 0px 2.00345px 15.94674px 0px rgba(0, 0, 0, 0.08), 0px 3.57381px 30.34034px 0px rgba(0, 0, 0, 0.10), 0px 6.68442px 55.25337px 0px rgba(0, 0, 0, 0.12), 0px 16px 116px 0px rgba(0, 0, 0, 0.16)",
          }}
        >
          <h1 className="text-white font-extrabold text-3xl">
            YEYYY, KAMU BERHASIL!
          </h1>
          <p className="text-white mb-3 px-5">
            Pembelajaran interaktif PKWU (Prakarya dan Kewirausahaan)
          </p>
          <ButtonLevel Text="Back to home" Link={"/"} />
        </div>
      </div>
      <div className="md:w-[50%]">
        <img
          src={HeroHomePage}
          alt=""
          className="relative w-[100%] z-10 md:w-[100%] sm:w-[70%] lg:w-[95%] lg:top-[35vh] xl:w-[90%] sm:mx-auto md:top-[50vh] xl:top-[25vh] 2xl:top-[15vh]"
        />
        <img
          src={VektorBlobSatu}
          alt=""
          className="max-h-[100%] absolute top-[50vh] sm:top-[55vh] left-0 z-0 w-[100%] md:hidden"
        />
        <img
          src={VektorBlobDua}
          alt=""
          className="max-h-[100%] absolute top-[76vh] sm:top-[90vh] left-0 z-0 w-[100%] md:hidden"
        />

        <img
          src={VektorBlobTiga}
          alt=""
          className="max-h-[100%] absolute top-[55vh] left-0 z-0 w-[100%] hidden md:block lg:top-[30vh] 2xl:top-[15vh]"
        />
      </div>
    </div>
  );
};

export default Home;
