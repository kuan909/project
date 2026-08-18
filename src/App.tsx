import { Route, Switch } from 'wouter';
import { GamePage } from './pages/GamePage';
import { ChapterTwoPage } from './pages/ChapterTwoPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/game" component={GamePage} />
      <Route path="/chapter-2" component={ChapterTwoPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
