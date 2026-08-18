import { Link } from 'wouter';
import { getSavedChapter } from '../lib/progress';

export function HomePage() {
  const savedChapter = getSavedChapter();

  return (
    <main className="landing">
      <div className="landing__sky">
        <div className="landing__sun" />
        <span className="landing__plane">➤</span>
      </div>
      <section className="landing__content">
        <span className="eyebrow">СЮЖЕТНОЕ ПРИКЛЮЧЕНИЕ</span>
        <h1>Курьер<br />конца света</h1>
        <p>Доставляй посылки между летающими островами. Береги самолёт, заслужи доверие людей и реши судьбу последнего семени Земли.</p>
        <Link className="start-button" href={savedChapter === 2 ? '/chapter-2' : '/game'}>{savedChapter === 2 ? 'Продолжить главу 2' : 'Начать полёт'} <span>→</span></Link>
        <small>Две главы · несколько концовок</small>
      </section>
    </main>
  );
}
