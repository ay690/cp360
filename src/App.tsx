import Layout from "./components/Layout/Layout";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Calendar Dashboard
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore your data through an interactive calendar interface. Click
              on highlighted dates to view detailed analytics and
              visualizations.
            </p>
          </div>
        </div>
      </Layout>
    </Provider>
  );
}

export default App;
