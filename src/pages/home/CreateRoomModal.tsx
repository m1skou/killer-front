import { Fragment, useContext, useState } from 'react';
import tw from 'tailwind-styled-components';

import Room from '@/assets/icons/room.svg';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import t from '@/helpers/translate';
import { PlayerContext } from '@/hooks/context/player';

import { createPlayer, createRoom } from './services/requests';

const HeadContent = tw.div`
  flex flex-row items-center
`;

const Title = tw.h2`
  mb-0 ml-0.5
`;

const Icon = tw.img`
  h-3 md:h-4
`;

export const CreateRoomModal = (): JSX.Element | null => {
  const [inputPseudo, setInputPseudo] = useState('');

  const { refreshPlayerSession } = useContext(PlayerContext);

  const handleCreateRoom = async (): Promise<void> =>
    createPlayer({ name: inputPseudo })
      .then(createRoom)
      .then(refreshPlayerSession);

  return (
    <Fragment>
      <HeadContent>
        <Icon alt="roomIcon" src={Room} />
        <Title>{t('home.create_room')}</Title>
      </HeadContent>
      <Input
        id="pseudo"
        type="text"
        label={t('common.create_pseudo_label')}
        placeholder={t('common.create_pseudo_placeholder')}
        value={inputPseudo}
        onChange={({ target }) => setInputPseudo(target.value.toUpperCase())}
        uppercase
      />
      <Button
        content={t('home.create_room_modal_button')}
        disabled={!inputPseudo}
        onClick={handleCreateRoom}
      />
    </Fragment>
  );
};
