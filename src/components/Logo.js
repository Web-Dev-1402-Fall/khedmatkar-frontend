const Logo = ({ hasText = true }) => {
  return (
    <div className="flex items-center">
      <img src="/logo.png" width={60} height={60} alt="Logo" />
      {hasText && <span className="text-3xl font-bold mr-2">خدمتکار</span>}
    </div>
  );
};

export default Logo;
