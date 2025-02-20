import Link from "next/link"

const Navbar = () => {
  

   

  return (
    <header class="text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <Link href="/"  class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span class="ml-3 text-xl">BookHive</span>
      </Link>
      <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      <Link href="/signup" className="hover:text-gray-900 mx-2">
                <i className="icofont-home" style={{marginRight:'5px'}}></i>signup
              </Link>
      <Link href="/login" className="hover:text-gray-900 mx-2">
                <i className="icofont-home" style={{marginRight:'5px'}}></i>login
              </Link>
      <Link href="/admin" className="hover:text-gray-900 mx-2">
                <i className="icofont-home" style={{marginRight:'5px'}}></i>admin
              </Link>
      <Link href="/requestbook" className="hover:text-gray-900 mx-2">
                <i className="icofont-home" style={{marginRight:'5px'}}></i>request
              </Link>
      <Link href="/ai" className="hover:text-gray-900 mx-2">
                <i className="icofont-home" style={{marginRight:'5px'}}></i>Ask AI
              </Link>
      <Link href="/ebooks" className="hover:text-gray-900 mx-2">
                <i className="icofont-home" style={{marginRight:'5px'}}></i>Ebook
              </Link>
        {/* <Link href ="/login"class="mr-5 hover:text-gray-900">Second</Link>
        <Link class="mr-5 hover:text-gray-900">Third</Link>
        <Link class="mr-5 hover:text-gray-900">Fourth</Link> */}
      </nav>
      <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
      
      <Link href="/login" className="cursor-pointer inline-flex items-center mr-3 bg-gray-100 border-0 py-3 px-4  focus:outline-none hover:bg-gray-200 rounded text-base my-2 md:mt-0">
              <i className="icofont-user" style={{marginRight:'5px'}}></i>Login
            </Link>
    </div>
  </header>)
};

export default Navbar;
