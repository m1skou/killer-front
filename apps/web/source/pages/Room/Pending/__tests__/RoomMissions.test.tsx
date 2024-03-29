import { type TranslationKey, t } from '@killerparty/intl';
import { screen } from '@testing-library/react';
import { sources } from 'eventsourcemock';

import { fakeMissionOne, fakeMissionTwo } from '@/tests/mocks/missions';
import {
  pendingRoomWithMissions,
  roomCode,
  roomEventSource,
} from '@/tests/mocks/rooms';
import { getPlayerSession } from '@/tests/mocks/services/player';
import { getRoomSession } from '@/tests/mocks/services/room';
import { pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<RoomMissions />', () => {
  it('should show the count of all missions in the room', async () => {
    server.use(
      getPlayerSession(pendingRoomSession),
      getRoomSession(roomCode, pendingRoomWithMissions),
    );

    renderWithProviders();

    await screen.findByText(t('room.welcome.title'));

    expect(
      screen.getByText(
        t('room.missions.count' as TranslationKey, {
          count: pendingRoomWithMissions.missions.length,
        }),
      ),
    ).toBeInTheDocument();
  });

  it('should update the count of all missions in the room when SSE emits a new message', async () => {
    server.use(
      getPlayerSession(pendingRoomSession),
      getRoomSession(roomCode, pendingRoomWithMissions),
    );

    renderWithProviders();

    await screen.findByText(
      t('room.missions.count' as TranslationKey, {
        count: pendingRoomWithMissions.missions.length,
      }),
    );

    const newRoomInfos = {
      ...pendingRoomWithMissions,
      missions: [fakeMissionOne, fakeMissionTwo],
    };

    server.use(getRoomSession(roomCode, newRoomInfos));

    sources[roomEventSource].emit(
      'message',
      new MessageEvent('message', {
        data: JSON.stringify(newRoomInfos),
      }),
    );

    expect(
      await screen.findByText(
        t('room.missions.count' as TranslationKey, {
          count: newRoomInfos.missions.length,
        }),
      ),
    ).toBeInTheDocument();
  });
});
