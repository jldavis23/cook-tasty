import "./globals.css";

export const metadata = {
  title: "Cook Tasty",
  description: "Recipe App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='font-arvo'>
        <nav className="bg-base-100 shadow fixed top-0 w-full z-50">
          <div className="navbar font-lato max-w-5xl m-auto">
            <div className="navbar-start">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a href="#view-recipes">VIEW RECIPES</a></li>
                  <li><a href="#add-recipes">ADD RECIPES</a></li>
                </ul>
              </div>
              <p className="px-5 text-primary font-arvo text-xl">Cook Tasty</p>
            </div>
            <div className="navbar-end hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                <li><a href="#view-recipes">VIEW RECIPES</a></li>
                <li><a href="#add-recipes">ADD RECIPES</a></li>
              </ul>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
