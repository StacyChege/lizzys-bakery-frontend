import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    // min-h-screen gives us a full height backdrop container layout 
    // flex-col + flex-1 forces the footer down to the screen bottom if page content is short
    <div className="min-h-screen flex flex-col bg-bakery-cream">
      {/* Main Global Navigation */}
      <Navbar />

      {/* Dynamic Screen Viewer Content Area */}
      <main className="flex-1">
        {/* TODO: We will build out React Router configurations inside here later this week */}
      </main>

      {/* Global Bottom Footer Layout */}
      <Footer />
    </div>
  );
}

export default App;