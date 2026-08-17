import { useState } from 'react';
import { artifacts } from '../lib/game';

type ArtifactCollectionProps = {
  collected: string[];
};

export function ArtifactCollection({ collected }: ArtifactCollectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="artifact-button" type="button" onClick={() => setIsOpen(true)}>
        <span>✦</span>
        <div><small>Артефакты</small><b>{collected.length}/{artifacts.length}</b></div>
      </button>
      {isOpen && (
        <div className="artifact-overlay" role="dialog" aria-modal="true" aria-label="Коллекция артефактов">
          <section className="artifact-collection">
            <button className="artifact-close" type="button" onClick={() => setIsOpen(false)} aria-label="Закрыть коллекцию">×</button>
            <span className="eyebrow">КОЛЛЕКЦИЯ КУРЬЕРА</span>
            <h2>Артефакты островов</h2>
            <p>Каждая завершённая доставка оставляет память о приключении.</p>
            <div className="artifact-grid">
              {artifacts.map((artifact) => {
                const isCollected = collected.includes(artifact.id);
                return (
                  <article className={isCollected ? 'is-collected' : ''} key={artifact.id}>
                    <span>{isCollected ? artifact.icon : '?'}</span>
                    <strong>{isCollected ? artifact.name : 'Не найдено'}</strong>
                    <small>{isCollected ? artifact.description : 'Исследуй острова, чтобы открыть.'}</small>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
