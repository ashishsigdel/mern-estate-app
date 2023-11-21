import {Link} from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign UP</h1>
      <form className='flex flex-col gap-4 '>
        <input type="text" placeholder='username' className='p-3 rounded-lg border' id='username'/>
        <input type="email" placeholder='email' className='p-3 rounded-lg border' id='email'/>
        <input type="password" placeholder='password' className='p-3 rounded-lg border' id='password'/>
        <button className='bg-slate-800 p-3 text-white uppercase font-semibold rounded-lg disabled:bg-slate-600 hover:bg-slate-900 transition duration-500 '>Sign up</button>
      </form>
      <div className='flex mt-5 gap-2'>
      <p className=''>Already have an account?</p>
      <Link to='/sign-in'>
      <span className='text-blue-700 cursor-pointer'>Sign in</span>
      </Link>
      </div>
    </div>
  )
}
