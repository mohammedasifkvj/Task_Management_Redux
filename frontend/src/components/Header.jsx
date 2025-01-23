import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold'>Task Management App</h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'>
            {currentUser ? (
              <li>Home</li>
            ) : (
              <li></li>
            )}
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <li>Profile</li>
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}