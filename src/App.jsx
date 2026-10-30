import NavaBar from "./components/NavaBar";
import MainRouter from "./router/MainRouter";
import Footer from "./UI/Footer";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <div className="relative min-h-screen bg-[#0c2417] font-body text-cream antialiased selection:bg-sage selection:text-forest">
      <ScrollToTop />
      {/* Background ambient lighting glows for glassmorphism */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full bg-emerald-600/15 blur-[140px]" />
        <div className="absolute top-[35%] -right-32 h-[500px] w-[500px] rounded-full bg-sage/10 blur-[150px]" />
        <div className="absolute bottom-10 left-10 h-[600px] w-[600px] rounded-full bg-amber-500/10 blur-[170px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <NavaBar />
        <MainRouter/>
        <Footer wordmark="bhoj" preset="bhoj" dotGap={6} radius={85} />
      </div>
    </div>
  );
};

export default App;
