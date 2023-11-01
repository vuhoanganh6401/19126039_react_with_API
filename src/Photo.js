const Photo = ({
                 urls: { small },
                 alt_description,
               }) => {
  return (
      <img src={small} alt={alt_description} />
  );
};

export default Photo;