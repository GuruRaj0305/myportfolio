const ImageDetailView = ({ src, alt, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <button
        className="absolute top-5 right-5 text-white text-3xl font-bold"
        onClick={onClose}
      >
        &times;
      </button>
      <img
        src={src}
        alt={alt}
        className="max-h-full max-w-full rounded-xl shadow-2xl"
      />
    </div>
  );
};

export default ImageDetailView;
