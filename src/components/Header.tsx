"use client"

import { Button } from "./ui/button";


export default function Header() {
  return (
    <header className="bg-gray-300 p-4 rounded-3xl mx-10 my-5 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-lg font-bold text-[#252B61]">Medcare</h1>
        {/* <input
          type="text"
          placeholder="Search"
          className="ml-4 p-2 border rounded-2xl "
        /> */}
      </div>
      <nav className="flex items-center gap-10 text-lg">
      <Button 
    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
    type="submit"
    onClick={() => window.location.href = '/admin/login'}
>
    Login as Admin
</Button>
<Button 
    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
    type="submit"
    onClick={() => window.location.href = '/admin/signup'}
>
    Signup As admin
</Button>
<Button 
    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
    type="submit"
    onClick={() => window.location.href = '/user/loginu'}
>
    Login as User
</Button>
<Button 
    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
    type="submit"
    onClick={() => window.location.href = '/user/sign-up'}
>
    Sign-up as User
</Button>
        
      </nav>
    </header>
  );
}
