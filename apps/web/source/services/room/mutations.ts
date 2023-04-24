import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createRoomRequest,
  deleteRoomRequest,
  startPartyRequest,
} from './requests';
import {
  type CreateRoomMutation,
  type DeleteRoomMutation,
  type StartPartyMutation,
} from './types';

export function useCreateRoom(): CreateRoomMutation {
  const queryClient = useQueryClient();

  const createRoom = useMutation({
    mutationFn: createRoomRequest,
    onSuccess: () => queryClient.invalidateQueries(['session']),
  });

  return { createRoom };
}

export function useDeleteRoom(): DeleteRoomMutation {
  const queryClient = useQueryClient();

  const deleteRoom = useMutation({
    mutationFn: deleteRoomRequest,
    onSuccess: () => queryClient.invalidateQueries(['session']),
  });

  return { deleteRoom };
}

export function useStartParty(): StartPartyMutation {
  const startParty = useMutation({ mutationFn: startPartyRequest });

  return { startParty };
}