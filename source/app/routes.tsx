import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from '@/layout/Layout';
import { HomePage } from '@/pages/Home';
import { JoinRoomPage } from '@/pages/JoinRoom';
import { NotFoundPage } from '@/pages/NotFound';
import { RoomPage } from '@/pages/Room';
import { EndedRoomPage } from '@/pages/Room/Ended';
import { PendingRoomPage } from '@/pages/Room/Pending';
import { PlayingRoomPage } from '@/pages/Room/Playing';

export function Routes(): JSX.Element {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          element: <Layout />,
          children: [
            { path: '/', element: <HomePage /> },
            { path: '/join/:roomCode', element: <JoinRoomPage /> },
            {
              path: '/room/:roomCode',
              element: <RoomPage />,
              children: [
                {
                  path: '/room/:roomCode/pending',
                  element: <PendingRoomPage />,
                },
                {
                  path: '/room/:roomCode/playing',
                  element: <PlayingRoomPage />,
                },
                {
                  path: '/room/:roomCode/ended',
                  element: <EndedRoomPage />,
                },
              ],
            },
            { path: '*', element: <NotFoundPage /> },
          ],
        },
      ])}
    />
  );
}
