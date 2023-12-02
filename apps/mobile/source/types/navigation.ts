import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  CreateRoom: undefined;
  JoinRoom: undefined;
  ChoosePseudo?: { shouldCreateRoom: boolean };
  ChooseRoom: { playerId: number };
  ChooseAvatar: { playerId: number; shouldCreateRoom: boolean };
  PendingRoom:
    | { roomCode: string }
    | { screen: string; params: Record<string, unknown> };
  PlayingRoom: { roomCode: string };
  EndedRoom: { roomCode: string };
  Rules: undefined;
  RoomInfos: { roomCode: string; routeName: keyof RootStackParamList };
  RoomPlayers: { roomCode: string; routeName: keyof RootStackParamList };
  RoomMissions: { roomCode: string; routeName: keyof RootStackParamList };
  RoomSettings: { roomCode: string; routeName: keyof RootStackParamList };
};

export type StackNavigation = NativeStackNavigationProp<RootStackParamList>;
