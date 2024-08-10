import './App.css'
import { UserLayout } from './components/user/userLayout.component';
import { AuthProvider } from './context/auth.context';

// function App() {
//   return (
//     <>
//        {/* <Outlet /> */}
//        <UserLayout/>
//     </>
//   )
// }

const App: React.FC = () => {
  return (
    <AuthProvider>
      <UserLayout />
    </AuthProvider>
  );
};

export default App
