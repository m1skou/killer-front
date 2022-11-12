import { useContext } from 'react';
import tw, { styled } from 'twin.macro';

import Admin from '@/assets/icons/admin.svg';
import KickPlayer from '@/assets/icons/kickPlayer.svg';
import LeaveRoomImage from '@/assets/icons/leaveRoom.svg';
import Player from '@/assets/images/player.png';
import { ModalContext } from '@/hooks/context/modal';
import { PlayerRole } from '@/services/player/constants';
import { usePlayerSession } from '@/services/player/queries';

import { KickPlayerModal } from './KickPlayerModal';
import { LeaveRoomModal } from './LeaveRoomModal';

const PlayerItem = tw.div`
  flex flex-row items-center 
  text-center py-2 justify-center 
  border-b relative
`;

const PlayerImage = tw.img`
  absolute h-4 left-1
`;

const PlayerName = styled.p<{ currentPlayer: boolean }>`
  ${({ currentPlayer }) => (currentPlayer ? tw`font-bold` : `font-medium`)}

  text-2xl md:text-3xl
  text-center uppercase
`;

const KickPlayerIcon = tw.img`
  absolute cursor-pointer right-2
`;

const LeaveRoomIcon = tw.img`
  absolute cursor-pointer right-[1.8rem]
`;

const AdminStatusIcon = tw.img`
  absolute right-2 h-2.5
`;

interface Props {
  playerId: number;
  playerName: string;
  playerRole: PlayerRole;
}

export function RoomPlayer({
  playerId,
  playerName,
  playerRole,
}: Props): JSX.Element {
  const { playerSession } = usePlayerSession();
  const { openModal } = useContext(ModalContext);

  return (
    <PlayerItem key={playerName}>
      <PlayerImage alt={`player-${playerName}`} src={Player} />
      <PlayerName currentPlayer={playerSession?.id === playerId}>
        {playerName}
      </PlayerName>
      {playerRole === PlayerRole.ADMIN && playerSession?.id !== playerId && (
        <AdminStatusIcon alt="admin" src={Admin} />
      )}
      {playerSession?.id === playerId && (
        <LeaveRoomIcon
          alt="leaveRoom"
          src={LeaveRoomImage}
          onClick={() => openModal(<LeaveRoomModal />)}
        />
      )}
      {playerSession?.role === PlayerRole.ADMIN &&
        playerSession.id !== playerId && (
          <KickPlayerIcon
            alt={`kick${playerName}`}
            src={KickPlayer}
            onClick={() =>
              openModal(
                <KickPlayerModal playerName={playerName} playerId={playerId} />,
              )
            }
          />
        )}
    </PlayerItem>
  );
}
