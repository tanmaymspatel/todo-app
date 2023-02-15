import Header from "./core/components/Header";

function App() {
  return (
    <div className="h-100 d-flex flex-column">
      <header id="header">
        <Header />
      </header>
      <main className="main-content flex-grow-1">
        main
      </main>
    </div>
  );
}

export default App;
