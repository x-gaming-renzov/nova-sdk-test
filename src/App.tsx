import React, { useEffect, useState } from "react";
import "./App.css";
import { useNova, useNovaExperience } from "nova-react-sdk";

// Types
interface GameState {
  screen: 'landing' | 'lobby' | 'store';
  heroName: string;
  showWelcomePopup: boolean;
}

// Landing Page Component
const LandingPage: React.FC<{ onEnterArena: (heroName: string) => void }> = ({ onEnterArena }) => {
  const [heroName, setHeroName] = useState('');
  const { objects: landingObjects } = useNovaExperience("landing");
  const { objects: themeObjects } = useNovaExperience("theme");
  
  const landingData = landingObjects?.["ftue-landing"];
  const themeData = themeObjects?.["ui-theme"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroName.trim()) {
      onEnterArena(heroName.trim());
    }
  };

  return (
    <div className="landing-page" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: themeData?.text_color || '#fff',
      padding: '20px',
      overflow: 'hidden'
    }}>
      {/* Background Image Layer */}
      {landingData?.background_art && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${landingData.background_art})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px)',
          transform: 'scale(1.1)', // Slightly scale up to avoid blur edges
          zIndex: 1
        }} />
      )}
      
      {/* Gradient Overlay Layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
        zIndex: 2
      }} />
      
      {/* Content Layer */}
      <div className="landing-content" style={{
        position: 'relative',
        textAlign: 'center',
        maxWidth: '600px',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '40px',
        borderRadius: `${themeData?.card_radius || 16}px`,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        zIndex: 3
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '20px',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          {landingData?.game_title || "Nova Legends: Battle for the Stars"}
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '40px',
          opacity: 0.9
        }}>
          {landingData?.tagline || "Join millions of players. Claim your welcome rewards and start your adventure!"}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={heroName}
            onChange={(e) => setHeroName(e.target.value)}
            placeholder={landingData?.username_placeholder || "Choose your hero name"}
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '1.1rem',
              border: 'none',
              borderRadius: `${themeData?.card_radius || 16}px`,
              marginBottom: '20px',
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#333'
            }}
            required
          />
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px 30px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: `${themeData?.card_radius || 16}px`,
              background: themeData?.accent_color || '#ff6b6b',
              color: '#fff',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {landingData?.cta_button || "Enter the Arena"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Welcome Popup Component
const WelcomePopup: React.FC<{ onClose: () => void; onClaimOffer: () => void }> = ({ onClose, onClaimOffer }) => {
  const { objects: popupObjects } = useNovaExperience("popup");
  const { objects: themeObjects } = useNovaExperience("theme");
  const popupData = popupObjects?.["welcome-offer-popup"];
  const themeData = themeObjects?.["ui-theme"];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px',
        borderRadius: `${themeData?.card_radius || 16}px`,
        maxWidth: '400px',
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '24px',
            cursor: 'pointer'
          }}
        >
          ×
        </button>
        
        <h2 style={{ marginBottom: '20px', fontSize: '1.8rem' }}>
          {popupData?.popup_title || "🎁 Welcome Offer"}
        </h2>
        
        <p style={{ marginBottom: '30px', fontSize: '1.1rem' }}>
          {popupData?.popup_message || "500 Gems + 20% Off Your First Purchase! Limited time only."}
        </p>
        
        <button
          onClick={onClaimOffer}
          style={{
            padding: '15px 30px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: `${themeData?.card_radius || 16}px`,
            background: themeData?.accent_color || '#ff6b6b',
            color: '#fff',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {popupData?.popup_button || "Claim Now"}
        </button>
      </div>
    </div>
  );
};

// Main Lobby Component
const MainLobby: React.FC<{ heroName: string; onNavigateToStore: () => void }> = ({ heroName, onNavigateToStore }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { objects: lobbyObjects } = useNovaExperience("lobby");
  const { objects: themeObjects } = useNovaExperience("theme");
  
  const lobbyData = lobbyObjects?.["main-lobby"];
  const themeData = themeObjects?.["ui-theme"];

  useEffect(() => {
    if (lobbyData?.show_popup) {
      setShowPopup(true);
    }
  }, [lobbyData]);

  const handleClaimOffer = () => {
    setShowPopup(false);
    onNavigateToStore();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: themeData?.background_color || '#181a20',
      color: themeData?.text_color || '#fff',
      padding: '20px'
    }}>
      {showPopup && (
        <WelcomePopup 
          onClose={() => setShowPopup(false)} 
          onClaimOffer={handleClaimOffer}
        />
      )}
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        paddingTop: '100px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {lobbyData?.welcome_message?.replace('{heroName}', heroName) || `Welcome, ${heroName}! Ready for your next quest?`}
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '60px',
          maxWidth: '800px',
          margin: '60px auto'
        }}>
          <button
            style={{
              padding: '20px',
              border: 'none',
              borderRadius: `${themeData?.card_radius || 16}px`,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: 0.5
            }}
            disabled
          >
            🎮 Play
            <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>Coming Soon</div>
          </button>
          
          <button
            onClick={onNavigateToStore}
            style={{
              padding: '20px',
              border: 'none',
              borderRadius: `${themeData?.card_radius || 16}px`,
              background: themeData?.accent_color || '#ff6b6b',
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            🛒 Store
          </button>
          
          <button
            style={{
              padding: '20px',
              border: 'none',
              borderRadius: `${themeData?.card_radius || 16}px`,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: 0.5
            }}
            disabled
          >
            🏆 Events
            <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>Coming Soon</div>
          </button>
        </div>
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const { objects: themeObjects } = useNovaExperience("theme");
  const themeData = themeObjects?.["ui-theme"];

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: `${themeData?.card_radius || 16}px`,
      padding: '20px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      backdropFilter: 'blur(10px)'
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {product.tag && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: themeData?.accent_color || '#ff6b6b',
          color: '#fff',
          padding: '5px 10px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}>
          {product.tag}
        </div>
      )}
      
      {product.discount > 0 && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: '#ff4757',
          color: '#fff',
          padding: '5px 10px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}>
          -{product.discount}% OFF
        </div>
      )}
      
      <div style={{
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '50%',
        margin: '20px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem'
      }}>
        <span className="gem-icon">💎</span>
      </div>
      
      <h3 style={{
        fontSize: '1.2rem',
        marginBottom: '10px',
        color: themeData?.text_color || '#fff'
      }}>
        {product.name}
      </h3>
      
      <p style={{
        fontSize: '0.9rem',
        opacity: 0.8,
        marginBottom: '15px',
        color: themeData?.text_color || '#fff'
      }}>
        {product.description}
      </p>
      
      <button style={{
        width: '100%',
        padding: '10px',
        border: 'none',
        borderRadius: `${themeData?.card_radius || 16}px`,
        background: themeData?.primary_color || '#667eea',
        color: '#fff',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}>
        Buy Now
      </button>
    </div>
  );
};

// Store Page Component
const StorePage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { objects: storeObjects } = useNovaExperience("store");
  const { objects: themeObjects } = useNovaExperience("theme");
  
  const storeHeaderData = storeObjects?.["store-header"];
  const storeProductsData = storeObjects?.["store-products"];
  const themeData = themeObjects?.["ui-theme"];

  const products = storeProductsData?.products ? JSON.parse(storeProductsData.products) : [];

  return (
    <div style={{
      minHeight: '100vh',
      background: themeData?.background_color || '#181a20',
      color: themeData?.text_color || '#fff'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: '#fff',
            padding: '10px 15px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          ← Back
        </button>
        
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>
          {storeHeaderData?.store_title || "Nova Store"}
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          opacity: 0.9
        }}>
          {storeHeaderData?.store_subtitle || "Special offers and bundles just for you!"}
        </p>
      </div>

      {/* Products Grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {products.map((product: any, index: number) => (
            <ProductCard key={product.id || index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const { setUser, loadAllExperiences, trackEvent, state } = useNova();
  const [gameState, setGameState] = useState<GameState>({
    screen: 'landing',
    heroName: '',
    showWelcomePopup: false
  });
  const [novaLoaded, setNovaLoaded] = useState(false);

  useEffect(() => {
    const appInit = async () => {
      // Get UTM source from URL params
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source') || 'direct';
      const referrer = urlParams.get('referrer') || '';
      
      // Generate user ID with random component
      const randomId = Math.random().toString(36).substring(2, 15);
      const userId = `user_${randomId}`;

      await setUser({
        userId,
        userProfile: { 
          utm_source: utmSource,
          referrer: referrer
        },
      });
    };

    appInit();
  }, [setUser]);

  useEffect(() => {
    const loadNovaExperiences = async () => {
      await loadAllExperiences();
      setNovaLoaded(true);
    };

    if (state.user) {
      loadNovaExperiences();
      trackEvent("App Loaded", {
        user_id: state.user.userId,
        utm_source: state.user.userProfile?.utm_source
      });
    }
  }, [state.user, loadAllExperiences, trackEvent]);

  const handleEnterArena = (heroName: string) => {
    const userIdWithHero = `${heroName}_${Math.random().toString(36).substring(2, 8)}`;
    
    // Update user with hero name
    setUser({
      userId: userIdWithHero,
      userProfile: { 
        ...state.user?.userProfile,
        hero_name: heroName
      },
    });

    setGameState({
      ...gameState,
      screen: 'lobby',
      heroName
    });

    trackEvent("Hero Created", {
      hero_name: heroName,
      user_id: userIdWithHero
    });
  };

  const handleNavigateToStore = () => {
    setGameState({
      ...gameState,
      screen: 'store'
    });

    trackEvent("Store Visited", {
      hero_name: gameState.heroName,
      user_id: state.user?.userId
    });
  };

  const handleBackToLobby = () => {
    setGameState({
      ...gameState,
      screen: 'lobby'
    });
  };

  if (!novaLoaded) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        fontSize: '1.2rem'
      }}>
        Loading Nova Experiences...
      </div>
    );
  }

  return (
    <div className="App">
      {gameState.screen === 'landing' && (
        <LandingPage onEnterArena={handleEnterArena} />
      )}
      
      {gameState.screen === 'lobby' && (
        <MainLobby 
          heroName={gameState.heroName} 
          onNavigateToStore={handleNavigateToStore} 
        />
      )}
      
      {gameState.screen === 'store' && (
        <StorePage onBack={handleBackToLobby} />
      )}
    </div>
  );
};

export default App;
