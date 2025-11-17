import { createPortal } from "react-dom";

const ImageDetailView = ({ src, alt, onClose }) => {
  return createPortal(
    <div
      className="
        fixed inset-0 
        bg-black/90 
        flex items-center justify-center 
        z-[1000000]
        p-4
      "
    >
      <button
        className="
          absolute 
          top-5 
          right-5 
          text-white 
          text-3xl 
          font-bold 
          z-[1000001]
        "
        onClick={onClose}
      >
        &times;
      </button>

      <img
        src={src}
        alt={alt}
        className="
          max-w-[95vw]
          max-h-[90vh]
          object-contain
          rounded-xl
          shadow-2xl
        "
      />
    </div>,
    document.body
  );
};

export default ImageDetailView;
