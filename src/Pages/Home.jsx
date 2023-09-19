import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import Bumper from "../Assets/Bumper.mp4";
import HeroHomePage from "../Assets/Hero Home Page.png";
import VektorBlobSatu from "../Assets/Vector-Blob-1.png";
import VektorBlobDua from "../Assets/Vector-Blob-2.png";
import VektorBlobTiga from "../Assets/Vector-Blob-3.png";
import ButtonLevel from "../Components/ButtonLevel";
import ButtonOnMusic from "../Assets/Button-Off-Music.png";
import ButtonOffMusic from "../Assets/Button-On-Music.png";
import { MusicContext } from "../Components/MusicContext";
import SoundButtonClick from "../Assets/Sound-Button-Click.mp3";

Modal.setAppElement("#root");

const VideoModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Video Modal"
      style={{
        overlay: {
          zIndex: 9999, // Mengatur tingkat z-index agar video tumpang tindih di atas elemen lain
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Latar belakang semi transparan
        },
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%", // Sesuaikan ukuran video modal sesuai kebutuhan
          maxWidth: "800px", // Batasi lebar maksimum
          border: "none",
          background: "transparent",
        },
      }}
    >
      <div>
        <video
          id="videoElement"
          width="100%"
          autoPlay
          controls
          onEnded={onClose}
        >
          <source src={Bumper} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </Modal>
  );
};

const Home = () => {
  const { isMusicPlaying, toggleMusic } = useContext(MusicContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showBumperVideo, setShowBumperVideo] = useState(false); // State untuk mengontrol tampilan video Bumper

  const openVideoModal = () => {
    setModalIsOpen(true);
  };

  const closeVideoModal = () => {
    setModalIsOpen(false);
  };

  const playBumperVideo = () => {
    setShowBumperVideo(true);
  };

  const soundButtonClick = new Howl({
    src: [SoundButtonClick],
  });

  const hoverButtonLevel =
    "hover:text-white hover:bg-red-600 hover:border-white hover:border-2 hover:scale-105";
  const transitionButtonLevel = "transition duration-500 ease-in-out transform";

  return (
    <div className="relative overflow-hidden flex flex-col md:flex-row justify-between h-[100vh] bg-red-600">
      <div className="text-center p-4 py-4 rounded-[10px] md:rounded-none bg-transparent relative z-10 md:w-[50%] mx-auto my-auto md:max-w-[600px]">
        <div
          className="mt-10 py-5 md:py-10 mb-3 z-"
          style={{
            borderRadius: "20px",
            background: "#DC2626",
            boxShadow:
              "0px 0.44276px 2.28762px 0px rgba(0, 0, 0, 0.04), 0px 1.06402px 7.25536px 0px rgba(0, 0, 0, 0.06), 0px 2.00345px 15.94674px 0px rgba(0, 0, 0, 0.08), 0px 3.57381px 30.34034px 0px rgba(0, 0, 0, 0.10), 0px 6.68442px 55.25337px 0px rgba(0, 0, 0, 0.12), 0px 16px 116px 0px rgba(0, 0, 0, 0.16)",
          }}
        >
          <h1 className="text-white font-extrabold text-4xl">SELAMAT DATANG</h1>
          <p className="text-white mb-3 px-5">
            Pembelajaran interaktif PKWU (Prakarya dan Kewirausahaan)
          </p>
          <button
            className={`text-white bg-red-600 w-[90%] rounded-lg text-2xl border-2 border-transparent my-2 py-1 font-medium ${hoverButtonLevel} ${transitionButtonLevel}`}
            onClick={showBumperVideo ? openVideoModal : playBumperVideo}
            style={{
              boxShadow:
                "0px 0.44276px 2.28762px 0px rgba(0, 0, 0, 0.04), 0px 1.06402px 7.25536px 0px rgba(0, 0, 0, 0.06), 0px 2.00345px 15.94674px 0px rgba(0, 0, 0, 0.08), 0px 3.57381px 30.34034px 0px rgba(0, 0, 0, 0.10), 0px 6.68442px 55.25337px 0px rgba(0, 0, 0, 0.12), 0px 16px 116px 0px rgba(0, 0, 0, 0.16)",
            }}
          >
            PembaTIK 2023
          </button>
          <ButtonLevel Text="Level 1" Link={"/level-1"} />
          <ButtonLevel Text="Level 2" Link={"/level-2"} />
          <ButtonLevel Text="Level 3" Link={"/level-3"} />
        </div>
        <div className="absolute top-7 left-5 flex z-10">
          <img
            className="w-[50px] relative"
            src={isMusicPlaying ? ButtonOffMusic : ButtonOnMusic}
            onClick={() => {
              toggleMusic(); // Menggunakan toggleMusic dari MusicContext
              soundButtonClick.play();
            }}
          />
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
      {showBumperVideo && (
        <VideoModal isOpen={modalIsOpen} onClose={closeVideoModal} />
      )}
    </div>
  );
};

export default Home;
