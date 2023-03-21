import { Link, Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const Layouds = () => {
  return (
    <>
      <div>
        <span
          style={{
            marginRight: 15,
          }}
        >
          <Link to="/">home</Link>
        </span>
        <span>
          <Link to="/movies">Movies</Link>
        </span>
      </div>
      <Suspense fallback={<div>Loading page...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layouds;
