import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

import { JOIN_ROOM_ROUTE } from '@/constants/endpoints';
import { renderWithProviders } from '@/tests/utils';

import { ShareRoomLink } from '../ShareRoomLink';

describe('<ShareRoomLink />', () => {
  it('should share the room link with navigator share if exists when the user click on the share button', () => {
    const spyNavigatorShare = vi.fn();

    Object.defineProperty(window, 'navigator', {
      value: { share: spyNavigatorShare },
      writable: true,
    });

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route path="/room/:roomCode" element={<ShareRoomLink />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Share link to join the room'));

    expect(spyNavigatorShare).toHaveBeenCalledTimes(1);
    expect(spyNavigatorShare).toHaveBeenCalledWith({
      title: 'Killerparty',
      text: 'Hey! Join my party and try to kill me ^^',
      url: `${JOIN_ROOM_ROUTE}/P9LDG`,
    });
  });

  it('should show directly the room link if the clipboard is not available', () => {
    Object.defineProperty(window, 'navigator', {
      value: { share: null, clipboard: null },
      writable: true,
    });

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route path="/room/:roomCode" element={<ShareRoomLink />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Share link to join the room'));

    expect(
      screen.getByText(
        `Copy and paste the following link: ${JOIN_ROOM_ROUTE}/P9LDG`,
      ),
    ).toBeInTheDocument();
  });

  it('should save the room link in clipboard if share is not available', async () => {
    const spyNavigatorClipboard = vi.fn().mockResolvedValue('');

    Object.defineProperty(window, 'navigator', {
      value: {
        share: null,
        clipboard: { writeText: spyNavigatorClipboard },
      },
      writable: true,
    });

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route path="/room/:roomCode" element={<ShareRoomLink />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Share link to join the room'));

    expect(
      await screen.findByText('Link saved in the clipboard!'),
    ).toBeInTheDocument();
    expect(spyNavigatorClipboard).toHaveBeenCalledTimes(1);
    expect(spyNavigatorClipboard).toHaveBeenCalledWith(
      `${JOIN_ROOM_ROUTE}/P9LDG`,
    );
  });

  it('should show directly the room link if the clipboard cant be performed', async () => {
    const spyNavigatorClipboard = vi.fn().mockRejectedValue('');

    Object.defineProperty(window, 'navigator', {
      value: {
        share: null,
        clipboard: { writeText: spyNavigatorClipboard },
      },
      writable: true,
    });

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route path="/room/:roomCode" element={<ShareRoomLink />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Share link to join the room'));

    expect(
      await screen.findByText(
        `Copy and paste the following link: ${JOIN_ROOM_ROUTE}/P9LDG`,
      ),
    ).toBeInTheDocument();
    expect(spyNavigatorClipboard).toHaveBeenCalledTimes(1);
    expect(spyNavigatorClipboard).toHaveBeenCalledWith(
      `${JOIN_ROOM_ROUTE}/P9LDG`,
    );
  });

  it('should let the user close the alert message if needed', async () => {
    Object.defineProperty(window, 'navigator', {
      value: { share: null, clipboard: null },
      writable: true,
    });

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/P9LDG']}>
        <Routes>
          <Route path="/room/:roomCode" element={<ShareRoomLink />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Share link to join the room'));

    expect(
      screen.getByText(
        `Copy and paste the following link: ${JOIN_ROOM_ROUTE}/P9LDG`,
      ),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByAltText('closeAlertMessage'));

    expect(
      screen.queryByText(
        `Copy and paste the following link: ${JOIN_ROOM_ROUTE}/P9LDG`,
      ),
    ).not.toBeInTheDocument();
  });
});
