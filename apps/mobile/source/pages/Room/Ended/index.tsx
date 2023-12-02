import { useTranslation } from '@killerparty/intl';
import { useRoom, useSession, useUpdatePlayer } from '@killerparty/webservices';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

import { Button } from '../../../components/Button';
import { CurrentAvatar } from '../../../components/CurrentAvatar';
import { RoomGuard } from '../../../components/RoomGuard';
import { type RootStackParamList } from '../../../types/navigation';

import { Ranking } from './Ranking';
import styles from './styles/index.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'EndedRoom'>;

export function EndedRoomPage({ route }: Props): JSX.Element {
  const {
    name: routeName,
    params: { roomCode },
  } = route;
  const { updatePlayer } = useUpdatePlayer();
  const { session } = useSession();
  const { room } = useRoom(roomCode!);
  const { t } = useTranslation();

  const handleLeaveRoom = async (): Promise<void> => {
    await updatePlayer.mutateAsync({ id: session?.id, room: null });
  };

  return (
    <RoomGuard roomCode={roomCode} currentRouteName={routeName}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {t('room.winner.name', { playerName: room?.winner?.name })}
        </Text>
        {room?.winner && <CurrentAvatar avatar={room.winner.avatar} />}
        <Ranking room={room} />
        <Button
          color="primary"
          onPress={handleLeaveRoom}
          text={t('room.play.another.party.button')}
          isAsyncAction
        />
      </View>
    </RoomGuard>
  );
}
