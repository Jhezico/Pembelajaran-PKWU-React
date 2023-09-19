import React, { useRef, useEffect } from "react";
import Modal from "react-modal";
import Bumper from "../Assets/Bumper.mp4";

Modal.setAppElement("#root"); // Set elemen root aplikasi sebagai elemen terkait aksesibilitas

const VideoModal = ({ isOpen }) => {
  const videoRef = useRef();

  useEffect(() => {
    const playVideo = async () => {
      try {
        if (videoRef.current) {
          await videoRef.current.play();
        }
      } catch (error) {
        console.error("Gagal memutar video:", error);
      }
    };

    if (isOpen && videoRef.current) {
      videoRef.current.addEventListener("canplay", playVideo);
    } else {
      // Hapus event listener jika modal ditutup
      videoRef.current?.removeEventListener("canplay", playVideo);
    }

    return () => {
      // Pastikan event listener dihapus saat komponen dibongkar
      videoRef.current?.removeEventListener("canplay", playVideo);
    };
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} contentLabel="Video Modal">
      <div>
        <video
          width="560"
          height="315"
          ref={videoRef}
          autoPlay
          controls={false}
        >
          <source src={Bumper} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </Modal>
  );
};

export default VideoModal;
