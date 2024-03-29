import { useTranslation } from '@killerparty/intl';
import { type ChangeEvent, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ModalContext } from '@/context/modal';
import { useDeleteRoom } from '@/services/room/mutations';

export function RoomSettingsModal(): JSX.Element {
  const { roomCode } = useParams();
  const { t } = useTranslation();
  const { closeModal } = useContext(ModalContext);
  const [inputRoomCode, setInputRoomCode] = useState('');
  const { deleteRoom } = useDeleteRoom();

  const handleInputRoomCode = ({
    target,
  }: ChangeEvent<HTMLInputElement>): void => {
    setInputRoomCode(target.value.toUpperCase());
  };

  const handleDeleteRoom = async (): Promise<void> => {
    await deleteRoom.mutateAsync(inputRoomCode, { onSuccess: closeModal });
  };

  return (
    <>
      <h2>{t('room.settings')}</h2>
      <Input
        id="deleteRoom"
        label={t('room.delete.current.room')}
        value={inputRoomCode}
        onChange={handleInputRoomCode}
        placeholder={t('room.delete.current.room.placeholder')}
        uppercase
      />
      <Button
        color="primary"
        disabled={inputRoomCode !== roomCode}
        onClick={handleDeleteRoom}
      >
        {t('room.delete.current.room.confirm.button')}
      </Button>
    </>
  );
}
