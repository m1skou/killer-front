export enum Method {
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum PlayerStatus {
  ALIVE = 'ALIVE',
  KILLED = 'KILLED',
}

export enum PlayerRole {
  ADMIN = 'ADMIN',
  PLAYER = 'PLAYER',
}

export enum RoomStatus {
  PENDING = 'PENDING',
  IN_GAME = 'IN_GAME',
  ENDED = 'ENDED',
}

export enum MercureEventType {
  ROOM_DELETED = 'room_deleted',
  ROOM_IN_GAME = 'room_in_game',
  PLAYER_KILLED = 'player_killed',
  NO_EVENT = 'no_event',
}
