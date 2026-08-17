import { useState } from 'react';

type FlightMenuProps = {
  onClose: () => void;
  onFly: () => void;
};

export function FlightMenu({ onClose, onFly }: FlightMenuProps) {
  const [isBriefing, setIsBriefing] = useState(false);

  return (
    <div className="flight-menu-overlay" role="dialog" aria-modal="true" aria-labelledby="flight-menu-title">
      <section className="flight-menu">
        <button className="flight-menu__close" onClick={onClose} aria-label="Закрыть">×</button>
        <span className="eyebrow">БОРТ «ЛАСТОЧКА»</span>

        {isBriefing ? (
          <>
            <h2 id="flight-menu-title">Как правильно летать</h2>
            <div className="flight-rules">
              <article><b>1</b><div><strong>Управляй штурвалом</strong><p><kbd>W</kbd>/<kbd>↑</kbd> — вверх, <kbd>S</kbd>/<kbd>↓</kbd> — вниз, <kbd>A</kbd> и <kbd>D</kbd> — крен. На телефоне двигай штурвал пальцем.</p></div></article>
              <article><b>2</b><div><strong>Следи за скоростью</strong><p>Меняй тягу ползунком справа. Скорость ниже 105 км/ч приводит к сваливанию.</p></div></article>
              <article><b>3</b><div><strong>Подготовь посадку</strong><p>В последние 7 секунд снизь высоту до 950 м и выровняй самолёт.</p></div></article>
              <article><b>4</b><div><strong>Сядь мягко</strong><p>Для успеха нужны: высота до 950 м, крен до 18° и скорость 105–175 км/ч.</p></div></article>
            </div>
            <div className="flight-menu__actions">
              <button className="flight-menu__secondary" onClick={() => setIsBriefing(false)}>Назад</button>
              <button className="flight-menu__primary" onClick={onFly}>Понятно, лететь →</button>
            </div>
          </>
        ) : (
          <>
            <div className="flight-menu__plane">➤</div>
            <h2 id="flight-menu-title">Готов к вылету?</h2>
            <p className="flight-menu__lead">Можно сразу выбрать остров или сначала пройти короткий инструктаж.</p>
            <div className="flight-menu__actions flight-menu__actions--stacked">
              <button className="flight-menu__primary" onClick={onFly}>Лететь — выбрать остров</button>
              <button className="flight-menu__secondary" onClick={() => setIsBriefing(true)}>Инструктаж по полёту</button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
