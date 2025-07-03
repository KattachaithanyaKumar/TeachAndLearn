const Wave = ({ color }) => {
  return (
    <svg
      viewBox="0 0 1200 150"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 w-full h-[100px] sm:h-[120px] md:h-[150px]"
    >
      <path
        d="
          M0,75
          Q50,0 100,75
          T200,75
          T300,75
          T400,75
          T500,75
          T600,75
          T700,75
          T800,75
          T900,75
          T1000,75
          T1100,75
          T1200,75
          V150
          H0
          Z
        "
        fill={color}
      />
    </svg>
  );
};

export default Wave;
