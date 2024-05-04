import { useTranslation } from '@killerparty/intl';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/Drawer';

import { ChooseGameMode } from './ChooseGameMode';
import { type Mode, modes } from './constants';
import { CreatePlayer } from './CreatePlayer';

interface Props {
  defaultAvatar: string;
  setDefaultAvatar: (avatar: string) => void;
}

export function CreateRoomV2({ defaultAvatar, setDefaultAvatar }: Props) {
  const { t } = useTranslation();

  const [mode, setMode] = useState<Mode>(modes[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        <Button size="lg">
          {t('home.create.room.button')}
          <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent title="Création de partie">
        <div className="flex mx-8 m-auto gap-8">
          <CreatePlayer
            defaultAvatar={defaultAvatar}
            setDefaultAvatar={setDefaultAvatar}
            mode={mode}
            setDrawerOpen={setDrawerOpen}
          />
          <ChooseGameMode mode={mode} setMode={setMode} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
