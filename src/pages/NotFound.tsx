import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div 
      className="min-h-screen bg-background font-['Arvo'] p-10"
      style={{ fontFamily: "'Arvo', serif" }}
    >
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <div className="text-center w-full max-w-2xl">
            <div 
              className="bg-no-repeat bg-center h-[400px] bg-contain mb-8"
              style={{
                backgroundImage: "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)"
              }}
            >
              {/* <h1 className="text-8xl font-bold text-primary pt-[100px]">404</h1> */}
            </div>
            
            <div className="mt-4">
              <h3 className="text-4xl font-bold mb-4 text-foreground">
                Look like you're lost
              </h3>
              
              <p className="text-lg mb-6 text-muted-foreground">
                The page you are looking for is not available!
              </p>
              
              <Link 
                to="/"
                className="inline-block px-6 py-3 bg-[#39ac31] text-white rounded-md hover:bg-[#2d8a26] transition-colors"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

