import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Oval
      height={60}
      width={60}
      color="#3f51b5"
      wrapperStyle={{ display: 'inline-block', textAlign: 'center' }}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#3f51b5"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default Loader;
