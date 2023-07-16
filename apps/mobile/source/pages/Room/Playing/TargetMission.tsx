import { useTranslation } from '@killerparty/intl';
import { useSession } from '@killerparty/webservices';
import { View, Text } from 'react-native';

import styles from './styles/TargetMission.module.css';

export function TargetMission(): JSX.Element {
  const { t } = useTranslation();
  const { session } = useSession();

  return (
    <View style={styles.mission}>
      <Text>{t('room.target.mission')}</Text>
      <Text style={styles.targetMission}>
        {session?.assignedMission?.content}
      </Text>
    </View>
  );
}
