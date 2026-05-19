import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clickSoundSrc from '../assets/audio/click.mp3';
import doorSoundSrc from '../assets/audio/door.mp3';
import takeSoundSrc from '../assets/audio/take.mp3';
import batonch from '../assets/game/batonch.png';
import doorImage from '../assets/game/door-sklad.png';
import doorBackground from '../assets/game/fon-doors.png';
import officeBackground from '../assets/game/fon-2121.png';
import vendingBackground from '../assets/game/fon-vend.png';
import handsIcon from '../assets/game/hands.png';
import vendingImage from '../assets/game/vending-sleep.png';
import vendingReadyImage from '../assets/game/vending.png';
import vovaOffice from '../assets/game/vova-2121.png';
import vovaStorage from '../assets/game/vova-sklad.png';
import vovaVending from '../assets/game/vova-vend.png';
import GameHeader from '../components/GameHeader';

const repairStartItems = [
  { id: '1', text: 'Нажать кнопку ВКЛ' },
  { id: '2', text: 'Взять вилку' },
  { id: '3', text: 'Поднять аппарат' },
  { id: '4', text: 'Вставить вилку в розетку' }
];

const correctRepairOrder = '3241';

export default function Game() {
  const navigate = useNavigate();
  const [stage, setStage] = useState('time');
  const [showDoorHint, setShowDoorHint] = useState(false);
  const [showVendingHint, setShowVendingHint] = useState(false);
  const [isMiniGameOpen, setIsMiniGameOpen] = useState(false);
  const [repairItems, setRepairItems] = useState(repairStartItems);
  const [draggedId, setDraggedId] = useState(null);
  const [selectedRepairId, setSelectedRepairId] = useState(null);
  const [repairMessage, setRepairMessage] = useState('');
  const [isRepaired, setIsRepaired] = useState(false);

  const clickSound = useRef(null);
  const doorSound = useRef(null);
  const takeSound = useRef(null);
  const draggedRepairId = useRef(null);

  useEffect(() => {
    if (stage !== 'time') {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setStage('office');
    }, 1800);

    return () => window.clearTimeout(timeout);
  }, [stage]);

  useEffect(() => {
    setShowDoorHint(false);
    setShowVendingHint(false);

    if (stage === 'door') {
      const timeout = window.setTimeout(() => setShowDoorHint(true), 1200);
      return () => window.clearTimeout(timeout);
    }

    if (stage === 'vending') {
      const timeout = window.setTimeout(() => setShowVendingHint(true), 1200);
      return () => window.clearTimeout(timeout);
    }

    return undefined;
  }, [stage]);

  const currentBackground = useMemo(() => {
    if (stage === 'office') return officeBackground;
    if (stage === 'door') return doorBackground;
    if (stage === 'vending') return vendingBackground;
    return null;
  }, [stage]);

  const playSound = (ref) => {
    if (!ref.current) return;
    ref.current.currentTime = 0;
    ref.current.play().catch(() => {});
  };

  const goToDoor = () => {
    playSound(clickSound);
    window.setTimeout(() => setStage('door'), 180);
  };

  const openDoor = () => {
    playSound(doorSound);
    window.setTimeout(() => setStage('vending'), 400);
  };

  const openMiniGame = () => {
    playSound(doorSound);
    setRepairMessage('');
    draggedRepairId.current = null;
    setDraggedId(null);
    setSelectedRepairId(null);
    setIsMiniGameOpen(true);
  };

  const swapItems = (sourceId, targetId) => {
    if (!sourceId || sourceId === targetId) return;

    setRepairItems((items) => {
      const next = [...items];
      const from = next.findIndex((item) => item.id === sourceId);
      const to = next.findIndex((item) => item.id === targetId);

      if (from < 0 || to < 0) return items;

      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
  };

  const moveRepairItem = (sourceId, targetId) => {
    if (!sourceId || sourceId === targetId) return;

    setRepairItems((items) => {
      const from = items.findIndex((item) => item.id === sourceId);
      const to = items.findIndex((item) => item.id === targetId);

      if (from < 0 || to < 0) return items;

      const next = [...items];
      const [movedItem] = next.splice(from, 1);
      next.splice(to, 0, movedItem);
      return next;
    });
  };

  const handleRepairItemClick = (itemId) => {
    if (!selectedRepairId) {
      setSelectedRepairId(itemId);
      return;
    }

    swapItems(selectedRepairId, itemId);
    setSelectedRepairId(null);
  };

  const checkRepair = () => {
    const order = repairItems.map((item) => item.id).join('');

    if (order === correctRepairOrder) {
      playSound(takeSound);
      setRepairMessage('Успех!');
      setIsRepaired(true);
      setIsMiniGameOpen(false);
      return;
    }

    setRepairMessage('Неверно. Попробуй ещё раз');
  };

  const resetRepair = () => {
    setRepairItems(repairStartItems);
    setRepairMessage('');
    draggedRepairId.current = null;
    setDraggedId(null);
    setSelectedRepairId(null);
  };

  if (stage === 'time') {
    return (
      <section className="index-time-screen" onClick={() => setStage('office')} aria-label="Начало игры">
        <span className="index-city">Великий Новгород</span>
        <span className="index-year">2121 ГОД</span>
      </section>
    );
  }

  return (
    <section className="index-game-page" style={{ backgroundImage: `url(${currentBackground})` }} aria-label="Новая игра">
      <GameHeader />

      {stage === 'office' && (
        <>
          <div className="index-office-text">
            <p>
              Привет! Меня зовут Вова,
              <br />
              я учусь в Школе21
            </p>
            <p>
              Сегодня я засиделся допоздна,
              <br />
              чтобы закончить трудный проект
            </p>
            <p>
              Пожалуй, пойду поищу кофейный
              <br />
              аппарат или станцию
              <br />с питательными гелями...
            </p>
          </div>

          <div className="index-office-actions">
            <button type="button" className="index-future-btn" onClick={goToDoor}>
              ИСКАТЬ КОФЕ
            </button>
            <button type="button" className="index-future-btn" onClick={() => navigate('/')}>
              ПОЙТИ ДОМОЙ
            </button>
          </div>

          <img src={vovaOffice} className="index-vova-office" alt="" />
        </>
      )}

      {stage === 'door' && (
        <>
          <button type="button" className="index-door-hitbox" aria-label="Открыть дверь" onClick={openDoor}>
            <img src={doorImage} className="index-door-img" alt="" />
          </button>

          <img src={vovaStorage} className="index-vova-storage" alt="" />

          <div className="index-dialogue index-dialogue-center">Хм М М М!... Не замечал раньше этой двери...</div>

          {showDoorHint && (
            <div className="index-hint index-hint-door">
              <img src={handsIcon} alt="" />
              <span>Нажмите, чтоб открыть</span>
            </div>
          )}
        </>
      )}

      {stage === 'vending' && (
        <>
          <button
            type="button"
            className={isRepaired ? 'index-vending-hitbox is-repaired index-vending-glow' : 'index-vending-hitbox'}
            aria-label="Открыть вендинговый аппарат"
            onClick={isRepaired ? undefined : openMiniGame}
            onMouseEnter={() => setShowVendingHint(false)}
          >
            <img src={isRepaired ? vendingReadyImage : vendingImage} className={isRepaired ? 'index-vending-img is-repaired' : 'index-vending-img'} alt="" />
          </button>

          <img src={vovaVending} className="index-vova-vending" alt="" />

          <div className="index-dialogue index-dialogue-right">
            Ого, как много пыли! Да сюда никто не заходил уже лет 100!
          </div>

          {showVendingHint && !isRepaired && (
            <div className="index-hint index-hint-vending">
              <img src={handsIcon} alt="" />
              <span>Нажмите, чтоб открыть</span>
            </div>
          )}

          {repairMessage && !isMiniGameOpen && !isRepaired && (
            <div className="index-repair-toast">{repairMessage}</div>
          )}

          {isRepaired && (
            <div className="index-bar-prize">
              <img src={batonch} className="index-bar-img" alt="Батончик" />
              <Link to="/login" className="index-eat-btn">
                СЪЕСТЬ БАТОНЧИК
              </Link>
            </div>
          )}
        </>
      )}

      {isMiniGameOpen && (
        <div className="index-minigame" role="dialog" aria-modal="true" aria-label="Починить вендинговый аппарат">
          <div className="index-minigame-bg" onClick={() => setIsMiniGameOpen(false)} />

          <div className="index-minigame-board">
            <h2>Починить вендинговый аппарат</h2>
            <p>Перетащите действия в правильном порядке, чтобы аппарат заработал.</p>

            <div className="index-repair-items">
              {repairItems.map((item) => (
                <div
                  key={item.id}
                  className={[
                    'index-repair-item',
                    draggedId === item.id ? 'dragging' : '',
                    selectedRepairId === item.id ? 'selected' : ''
                  ].filter(Boolean).join(' ')}
                  draggable
                  onClick={() => handleRepairItemClick(item.id)}
                  onDragStart={(event) => {
                    event.dataTransfer.effectAllowed = 'move';
                    event.dataTransfer.setData('text/plain', item.id);
                    draggedRepairId.current = item.id;
                    setDraggedId(item.id);
                    setSelectedRepairId(null);
                  }}
                  onDragEnter={(event) => {
                    event.preventDefault();
                    moveRepairItem(draggedRepairId.current, item.id);
                  }}
                  onDragEnd={() => {
                    draggedRepairId.current = null;
                    setDraggedId(null);
                  }}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    moveRepairItem(draggedRepairId.current || event.dataTransfer.getData('text/plain') || draggedId, item.id);
                    draggedRepairId.current = null;
                    setDraggedId(null);
                  }}
                >
                  {item.text}
                </div>
              ))}
            </div>

            {repairMessage && <p className="index-repair-message">{repairMessage}</p>}

            <div className="index-minigame-actions">
              <button type="button" className="index-mg-btn index-mg-btn-check" onClick={checkRepair}>
                Проверить
              </button>
            </div>
          </div>
        </div>
      )}

      <audio ref={clickSound} src={clickSoundSrc} preload="auto" />
      <audio ref={doorSound} src={doorSoundSrc} preload="auto" />
      <audio ref={takeSound} src={takeSoundSrc} preload="auto" />
    </section>
  );
}
