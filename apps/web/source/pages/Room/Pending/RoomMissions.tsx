import { type TranslationKey, useTranslation } from '@killerparty/intl';
import { useParams } from 'react-router-dom';

import { useRoom } from '@/services/room/queries';

import styles from './styles/RoomMissions.module.css';

export function RoomMissions(): JSX.Element {
  const { roomCode } = useParams();
  const { room } = useRoom(roomCode!);
  const { t } = useTranslation();

  const missions = room?.missions.length;

  return (
    <div className={styles.missions}>
      <h3>{t('room.missions.count' as TranslationKey, { count: missions })}</h3>
    </div>
  );
}
