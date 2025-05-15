import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

const pictures = [
  "DSC00680",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC01145",
  "DSC01420",
  "DSC01461",
  "DSC01489",
  "DSC02031",
  "DSC02064",
  "DSC02069",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);
  
  // Handle scroll to hide/show controls
  useEffect(() => {
    const handleScroll = () => {
      const bookSection = document.getElementById('book');
      if (bookSection) {
        const bookRect = bookSection.getBoundingClientRect();
        const isVisible = 
          bookRect.top < window.innerHeight && 
          bookRect.bottom > 0;
        setShowControls(isVisible);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Page navigation controls that show/hide based on scroll position */}
      <main 
        className={`pointer-events-none select-none z-20 fixed inset-0 flex justify-between flex-col transition-opacity duration-500 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex-grow"></div>
        <div className="w-full overflow-auto pointer-events-auto flex justify-center mb-8">
          <div className="overflow-auto flex items-center gap-2 max-w-full p-4 bg-black/50 backdrop-blur-sm rounded-xl shadow-xl">
            {/* First page (Cover) */}
            <button
              className={`border-transparent hover:border-white transition-all duration-300 px-4 py-2 rounded-full text-sm md:text-base uppercase shrink-0 border ${
                page === 0
                  ? "bg-white/90 text-black"
                  : "bg-black/70 text-white"
              }`}
              onClick={() => setPage(0)}
            >
              Cover
            </button>
            
            {/* Middle pages */}
            {pages.slice(1, pages.length - 1).map((_, idx) => {
              const pageIndex = idx + 1; // Adjust index to account for cover
              return (
                <button
                  key={pageIndex}
                  className={`border-transparent hover:border-white transition-all duration-300 px-4 py-2 rounded-full text-sm md:text-base uppercase shrink-0 border ${
                    pageIndex === page
                      ? "bg-white/90 text-black"
                      : "bg-black/70 text-white"
                  }`}
                  onClick={() => setPage(pageIndex)}
                >
                  {`Page ${pageIndex}`}
                </button>
              );
            })}
            
            {/* Back cover */}
            <button
              className={`border-transparent hover:border-white transition-all duration-300 px-4 py-2 rounded-full text-sm md:text-base uppercase shrink-0 border ${
                page === pages.length - 1
                  ? "bg-white/90 text-black"
                  : "bg-black/70 text-white"
              }`}
              onClick={() => setPage(pages.length - 1)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>

      <div
        className={`fixed inset-0 flex items-center -rotate-2 select-none transition-all duration-1000 ${
          page === pages.length ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="relative">
          <div className="bg-white/0 animate-horizontal-scroll flex items-center gap-8 w-max px-8">
            <h1 className="shrink-0 text-white text-10xl font-black">
              Happy
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              Birthday
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">Ishaa</h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              :3
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">I</h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              LOVE
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">You</h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Sooooooooooooooo Muchhhhhhhhh
            </h2>
          </div>
          <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
            <h1 className="shrink-0 text-white text-10xl font-black">
              Happy
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              Birthday
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">Ishaa</h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              I
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">Love</h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              You
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">sooooooooooooooo</h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Muchhhhhhhhhhh
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

