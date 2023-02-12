import { Fragment } from 'react';
import tw, { styled } from 'twin.macro';

import Delete from '@/assets/icons/delete.svg';
import Idea from '@/assets/images/idea.png';
import { useTranslation } from '@/hooks/useTranslation';
import { useDeleteMission } from '@/services/mission/mutations';
import { useSession } from '@/services/player/queries';

import { CreateMission } from './CreateMission';

const Container = tw.div`
  xl:w-1/2
`;

const Section = tw.div`
  flex flex-row items-center 
  mb-2 pb-2 border-b
`;

const Image = tw.img`
  h-7 mr-1
`;

const Missions = tw.div`
  flex flex-wrap
`;

const MissionCard = tw.div`
  shadow-xl border border-black
  p-1 mt-1 mr-1 rounded-lg bg-yellow-200
  max-w-[fit-content]	text-3xl relative
`;

const DeleteMission = styled.div`
  svg {
    ${tw`absolute -top-1 -right-1 cursor-pointer`}
  }
`;

export function PlayerMissions(): JSX.Element {
  const { t } = useTranslation();
  const { session } = useSession();
  const { deleteMission } = useDeleteMission();

  const handleDeleteMission = (missionId: number) => (): void => {
    deleteMission.mutate(missionId);
  };

  return (
    <Container>
      <Section>
        <Image alt="missions" src={Idea} />
        <>
          <h2>{t('room.manage.missions')}</h2>
          <p>{t('room.missions.description')}</p>
        </>
      </Section>
      <Missions>
        {session?.authoredMissions.map(({ id, content }) => (
          <Fragment key={`${id}-${content}`}>
            <MissionCard>
              <span>{content}</span>
              <DeleteMission onClick={handleDeleteMission(id)}>
                <Delete title={t('tooltip.delete.mission')} />
              </DeleteMission>
            </MissionCard>
          </Fragment>
        ))}
      </Missions>
      <CreateMission />
    </Container>
  );
}
