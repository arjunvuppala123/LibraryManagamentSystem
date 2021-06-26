import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
import SearchTitle from "./pages/SearchTitle"
import "./app.css"
import AddBook from "./pages/AddBook"
import DeleteBook from "./pages/DeleteBook"
import IssueBook from "./pages/IssueBook";
import ReturnBook from "./pages/ReturnBook"
import TitleToOrder from "./pages/TitleToOrder"
import NewTitle from "./pages/NewTitle"

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        <Route path='/profile'>
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='/searchTitle' exact>
          {authCtx.isLoggedIn && <SearchTitle />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='/add' exact>
          {authCtx.isLoggedIn && <AddBook />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='/delete' exact>
          {authCtx.isLoggedIn && <DeleteBook />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='/issue' exact>
          {authCtx.isLoggedIn && <IssueBook />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='/return' exact>
          {authCtx.isLoggedIn && <ReturnBook />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='/titletoorder' exact>
          {authCtx.isLoggedIn && <TitleToOrder />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='/newtitle' exact>
          {authCtx.isLoggedIn && <NewTitle />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='/issue/:title' exact>
          {authCtx.isLoggedIn && <IssueBook />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
