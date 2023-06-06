import { BallTriangle } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Spinner = () => {
  return (
    <div className={css.loader}>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#ec0867"
        ariaLabel="ball-triangle-loading"
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
};
