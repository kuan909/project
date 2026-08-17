import { Link } from 'wouter';

export function HomePage() {
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
        <Link className="start-button" href="/game">Начать полёт <span>→</span></Link>
        <small>Одна глава · несколько концовок</small>
      </section>
    </main>
  );
}
