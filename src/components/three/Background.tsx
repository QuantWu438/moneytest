const BackgroundEffects = () => {
    return (
      <>
        {/* Grid background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3c72_1px,transparent_1px),linear-gradient(to_bottom,#1e3c72_1px,transparent_1px)]
                       bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]
                       animate-grid-flow opacity-20" />
        </div>
  
        {/* Floating particles */}
        <div className="fixed inset-0 -z-5 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-neon-blue/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
  
        {/* Glowing orbs */}
        <div className="fixed inset-0 -z-5">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-blue/20 rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-secondary-blue/20 rounded-full blur-3xl animate-glow-pulse" 
               style={{ animationDelay: '1s' }} />
        </div>
  
        {/* Vignette effect */}
        <div className="fixed inset-0 -z-5 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </>
    );
  };